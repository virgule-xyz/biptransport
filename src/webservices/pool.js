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
  // timestamp = () => {
  //   return new Promise((resolve, reject) => {
  //     AsyncStorage.setItem(Pool.DATENAME, Date.now())
  //       .then(() => resolve())
  //       .catch(err => reject(err));
  //   });
  // };

  // save all datas in a local storage, file or other
  // return a promise
  persistDatas = collection => {
    return new Promise((resolve, reject) => {
      try {
        AsyncStorage.setItem(Pool.DATENAME, Date.now());
        AsyncStorage.setItem(name, JSON.stringify(collection)).then(() => resolve(collection));
      } catch (e) {
        reject(e);
      }
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
        try {
          Pool.SENDERS[sendCallbackId](values)
            .then(v => {
              resolve(values);
            })
            .catch(err => {
              if (err.err_no === 130) {
                resolve(values);
              } else reject(values);
            });
        } catch (e) {
          reject(values);
        }
      });
    }
    return new Promise(reject => reject(values));
  };

  // send.. the first one
  sendFirstElementOfCollection = () => {
    if (this.toSendCollection.length > 0 && !this.isSending) {
      if (!this.isSending) {
        this.isSending = true;
        const eltToSend = this.toSendCollection[0];
        return this.tryToSendDatas(eltToSend);
      }
    }
    return new Promise(reject =>
      reject(new Error({ code: 99, message: 'Plus aucun élément dans le cache' })),
    );
  };

  // remove... the first one
  removeFirstElementOfCollection = values => {
    return new Promise(resolve => {
      const newCollection = values
        ? this.toSendCollection.filter(elt => elt.values.num !== values.num)
        : this.toSendCollection.shift();
      this.isSending = false;
      this.setToSendCollection(newCollection)
        .then(() => {
          resolve(newCollection);
        })
        .catch(() => {
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
        this.sendFirstElementOfCollection()
          .then(values => {
            this.removeFirstElementOfCollection(values)
              .then(() => {
                resolve(true);
              })
              .catch(() => {
                reject(new Error({ code: 1, message: 'Elément non supprimé du cache' }));
              });
          })
          .catch(err => {
            if (err && err.code && err.code === 99) reject(err);
            else reject(new Error({ code: 2, message: 'Elément non envoyé à partir du cache' }));
          });
      } else {
        reject(new Error({ code: 3, message: 'Non autorisé à envoyer le cache' }));
      }
    });
  };

  makeOneFlush = () => {
    this.isSendingAllowed = true;
    try {
      this.sendCachedData()
        .then(() => {
          this.isSendingAllowed = false;
          if (this.toSendCollection.length > 0) this.makeOneFlush();
        })
        .catch(err => {
          this.isSendingAllowed = false;
          if (err.code === 99) Pool.clear();
          else if (err.code === 1 || err.code === 3) {
            if (this.toSendCollection.length > 0) this.makeOneFlush();
          } else if (err.code === 2) {
            this.removeFirstElementOfCollection().then(
              () => this.toSendCollection.length > 0 && this.makeOneFlush(),
            );
          }
        });
    } catch (e) {
      // FIXME: this.persistDatas(Pool.INITIAL_COLLECTION);
    }
  };

  // init the pool from the persistent storage
  init = () => {
    return new Promise((resolve, reject) => {
      this.unpersistDatas()
        .then(datas => {
          this.toSendCollection = datas || [];
          console.warn('ON LOAD', datas);
          resolve(datas);
        })
        .catch(() => {
          this.toSendCollection = [];
          resolve(this.toSendCollection);
        });
    });
  };

  // singleton instance
  static INSTANCE = false;

  // default values of persistent collection
  static INITIAL_COLLECTION = [];

  // private constructor
  constructor() {
    this.name = name;

    // collection of datas
    this.toSendCollection = [];

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
        Pool.INSTANCE.init()
          .then(() => {
            resolve(Pool.INSTANCE);
          })
          .catch(() => {
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
          if (pool.toSendCollection.length > 0) {
            const found = pool.toSendCollection.findIndex(
              elt =>
                JSON.stringify(elt.values) === JSON.stringify(values) &&
                elt.sendCallbackId === sendCallbackId,
            );
            if (found < 0) {
              pool.setToSendCollection([{ values, sendCallbackId }, ...pool.toSendCollection]);
            }
          } else {
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
