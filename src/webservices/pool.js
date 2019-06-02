/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */
import AsyncStorage from '@react-native-community/async-storage';
import { name } from '../../package';

class Pool {
  static DATENAME = `${name}date`;

  // set the last time it was used
  timestamp = () => {
    return AsyncStorage.setItem(Pool.DATENAME, Date.now());
  };

  // save all datas in a local storage, file or other
  // return a promise
  persistDatas = collection => {
    this.timestamp();
    return AsyncStorage.setItem(name, JSON.stringify(collection));
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
          resolve(JSON.parse(d));
        })
        .catch(e => reject(e));
    });
  };

  // use the WS of the datas to send it to the server
  // return a promise
  tryToSendDatas = ({ values, sendCallbackId }) => {
    console.warn('sending -> ', values, sendCallbackId);
    if (sendCallbackId && Pool.SENDERS && Pool.SENDERS[sendCallbackId]) {
      return Pool.SENDERS[sendCallbackId](values);
    }
    return new Promise(resolve => resolve(true));
  };

  // send.. the first one
  sendFirstElementOfCollection = () => {
    return new Promise((resolve, reject) => {
      if (this.toSendCollection.length > 0 && !this.isSending) {
        if (!this.isSending) {
          this.isSending = true;
          this.tryToSendDatas(this.toSendCollection[0])
            .then(ret => {
              if (ret) {
                resolve(true);
              } else {
                reject(new Error(ret));
              }
            })
            .catch(() => {
              reject(false);
            });
        }
      } else reject(false);
    });
  };

  // remove... the first one
  removeFirstElementOfCollection = () => {
    return new Promise((resolve, reject) => {
      const newCollection = [...this.toSendCollection];
      newCollection.shift();
      this.isSending = false;
      this.setToSendCollection(newCollection)
        .then(() => {
          resolve(newCollection);
        })
        .catch(e => {
          reject(e);
        });
    });
  };

  // send datas on isSendingAllowed changement
  setIsSendingAllowed = value => {
    return new Promise((resolve, reject) => {
      this.isSendingAllowed = value;
      if (value) {
        this.sendFirstElementOfCollection()
          .then(() => {
            this.removeFirstElementOfCollection()
              .then(() => {
                return this.setIsSendingAllowed(true);
              })
              .catch(e => {
                resolve();
              });
          })
          .catch(e => {
            resolve();
          });
      }
    });
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
    Pool.get().then(pool => {
      const found = pool.toSendCollection.findIndex(
        elt =>
          JSON.stringify(elt.values) === JSON.stringify(values) &&
          elt.sendCallbackId === sendCallbackId,
      );
      if (found < 0) {
        return pool.setToSendCollection([{ values, sendCallbackId }, ...pool.toSendCollection]);
      }
    });
  }

  // start sending datas on server
  static flush() {
    Pool.get()
      .then(pool => pool.setIsSendingAllowed(true))
      .catch(e => {});
  }

  // clear the whole pool
  static async clear() {
    try {
      const pool = await Pool.get();
      await pool.persistDatas(Pool.INITIAL_COLLECTION);
      return true;
    } catch (e) {
      return false;
    }
  }

  // read the timestamp
  static async date() {
    try {
      const lastUse = await AsyncStorage.getItem(Pool.DATENAME);
      return lastUse;
    } catch (e) {
      return -1;
    }
  }

  // get the age of the pool
  static async age() {
    try {
      const now = Date.now();
      const lastUse = await Pool.date();
      return now - lastUse;
    } catch (e) {
      return -1;
    }
  }

  // 4 hour is too old
  static async isTooOld() {
    try {
      return (await Pool.age()) >= 1000 * 60 * 60 * 4;
    } catch (e) {
      return false;
    }
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
