/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */
import AsyncStorage from '@react-native-community/async-storage';
import { name } from '../../package';

// TODO: Ne faire qu'un essai, si ça plante alors on envoie plus jusqu'à ce que le mec scan un début de passage
// TODO: Faire des envois dans les scans de passage

class Pool {
  static DATENAME = `${name}date`;

  // set the last time it was used
  timestamp = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(Pool.DATENAME, Date.now())
        .then(() => resolve())
        .catch(err => reject(err));
    });
  };

  // save all datas in a local storage, file or other
  // return a promise
  persistDatas = collection => {
    return new Promise((resolve, reject) => {
      this.timestamp()
        .then(() => {
          AsyncStorage.setItem(name, JSON.stringify(collection)).then(() => resolve());
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // persist datas on add or remove of toSendCollection
  setToSendCollection = value => {
    this.toSendCollection = [...value];
    return this.persistDatas(value);
  };

  // read all the datas saved
  // return a promise
  unpersistDatas = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(name)
        .then(d => {
          const buffer = JSON.parse(d);
          resolve(buffer);
        })
        .catch(err => reject(err));
    });
  };

  // use the WS of the datas to send it to the server
  // return a promise with the values sent has return
  tryToSendDatas = ({ values, sendCallbackId, tries = 1 }) => {
    console.warn('sending -> ', values, sendCallbackId, tries);
    if (sendCallbackId && Pool.SENDERS && Pool.SENDERS[sendCallbackId]) {
      return new Promise((resolve, reject) => {
        Pool.SENDERS[sendCallbackId](values)
          .then(ret => {
            resolve(values);
          })
          .catch(err => {
            if (tries < 3) {
              setTimeout(() => {
                this.tryToSendDatas({ values, sendCallbackId, tries: tries + 1 })
                  .then(values => resolve(values))
                  .catch(err => {
                    reject(values);
                  });
              }, 5000);
            } else {
              reject(values);
            }
          });
      });
    }
    return new Promise(reject => reject(values));
  };

  // send.. the first one
  sendFirstElementOfCollection = () => {
    return new Promise((resolve, reject) => {
      if (this.toSendCollection.length > 0 && !this.isSending) {
        if (!this.isSending) {
          this.isSending = true;
          const eltToSend = this.toSendCollection[0];
          return this.tryToSendDatas(eltToSend);
        }
      } else reject(null);
    });
  };

  // remove... the first one
  removeFirstElementOfCollection = values => {
    return new Promise((resolve, reject) => {
      const newCollection = this.toSendCollection.filter(elt => elt.num !== values.num);
      this.isSending = false;
      this.setToSendCollection(newCollection)
        .then(() => {
          resolve(newCollection);
        })
        .catch(e => {
          this.toSendCollection = newCollection;
          resolve(newCollection);
        });
    });
  };

  // send datas on isSendingAllowed changement
  sendCachedData = () => {
    return new Promise((resolve, reject) => {
      if (this.isSendingAllowed) {
        this.isSendingAllowed = false;
        this.sendFirstElementOfCollection().then(values => {
          this.removeFirstElementOfCollection(values)
            .then(() => {
              resolve(true);
            })
            .catch(() => {
              reject(1);
            });
        });
      } else {
        reject(3);
      }
    });
  };

  changeOrderToSend = () => {
    return new Promise((resolve, reject) => {
      if (this.toSendCollection.length < 2) reject();
      const first = this.toSendCollection[0];
      const second = this.toSendCollection[1];
      this.toSendCollection[0] = second;
      this.toSendCollection[1] = first;
      resolve();
    });
  };

  makeOneFlush = () => {
    this.isSendingAllowed = true;
    try {
      this.sendCachedData()
        .then(() => {
          debugger;
          this.isSendingAllowed = true;
          this.makeOneFlush();
        })
        .catch(err => {
          debugger;
          this.isSendingAllowed = false;
          if (err === 1) this.makeOneFlush();
          if (err === 2)
            this.changeOrderToSend()
              .then(() => {
                debugger;
                this.makeOneFlush();
              })
              .catch(() => {
                debugger;
                try {
                  this.persistDatas(Pool.INITIAL_COLLECTION);
                } catch (e) {}
              });
        });
    } catch (e) {
      this.changeOrderToSend()
        .then(() => {
          debugger;
          this.makeOneFlush();
        })
        .catch(() => {
          debugger;
          try {
            this.persistDatas(Pool.INITIAL_COLLECTION);
          } catch (e) {}
        });
    }
  };

  // init the pool from the persistent storage
  init = () => {
    return new Promise((resolve, reject) => {
      this.unpersistDatas()
        .then(datas => {
          this.toSendCollection = datas;
          console.warn('ON LOAD', datas);
          resolve(datas);
        })
        .catch(e => reject(e));
    });
  };

  // singleton instance
  static INSTANCE = false;

  // default values of persistent collection
  static INITIAL_COLLECTION = [];

  // private constructor
  constructor(params) {
    this.name = name;

    // collection of datas
    this.toSendCollection = Pool.INITIAL_COLLECTION;

    // are we sending datas
    this.isSending = false;

    // disable the possibility to send datas
    this.isSendingAllowed = false;
  }

  // array of link sender function and sender keys
  static SENDERS;

  // store the way datas can be sent
  static configSenders = senders => {
    Pool.SENDERS = senders;
  };

  // singleton builder
  static get() {
    return new Promise(resolve => {
      if (!Pool.INSTANCE || Pool.INSTANCE.name !== name) {
        Pool.INSTANCE = new Pool();
        Pool.INSTANCE.init().then(() => {
          resolve(Pool.INSTANCE);
        });
      } else resolve(Pool.INSTANCE);
    });
  }

  // add one component to the pool and try to send it
  static add(values, sendCallbackId) {
    return new Promise((resolve, reject) => {
      Pool.get()
        .then(pool => {
          const found = pool.toSendCollection.findIndex(
            elt =>
              JSON.stringify(elt.values) === JSON.stringify(values) &&
              elt.sendCallbackId === sendCallbackId,
          );
          if (found < 0) {
            pool.setToSendCollection([{ values, sendCallbackId }, ...pool.toSendCollection]);
          }
          resolve(pool.toSendCollection);
        })
        .catch(err => reject(err));
    });
  }

  // start sending datas on server
  static flush() {
    Pool.get()
      .then(pool => {
        debugger;
        pool.makeOneFlush();
      })
      .catch(err => {
        console.warn(err);
      });
  }

  // clear the whole pool
  static clear() {
    return new Promise((resolve, reject) => {
      Pool.get()
        .then(pool => {
          pool.persistDatas(Pool.INITIAL_COLLECTION).then(() => {
            resolve(Pool.INITIAL_COLLECTION);
          });
        })
        .catch(err => reject(err));
    });
  }
}

/*

How to use ?

configure all the sender functions
Pool.configSenders({ senderId1:functionToSend, senderId2:otherFunctionToSend });

functionToSend and otherFunctionToSend must return a Promise with resolveing on successful sent

add datas to the pool
Pool.add(values, senderId1);
values are sent with senderId1 function

and a big flush to send all the cache
Pool.flush()
*/

export default Pool;
