/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getCommands,
  getIdentTour,
  getIdentVehicle,
  isStory,
  putSos,
  putWaypoint,
  putGsmNumber,
  Pool,
} from '@webservices';
import openMap from 'react-native-open-maps';
import GetLocation from 'react-native-get-location';
import { splashname, name } from '../../package';

/**
 * The whole app context
 * This context allows for the management of all crossing points and associated actions
 */
const defaultAppState = {
  hideCarCodeBar: true,
  hideDriverCodeBar: false,
  rescueIsSearching: false,
  car: { id: '', immat: '', alert: '' },
  clues: [],
  conditionCollection: [],
  driver: { id: '', firstname: '', lastname: '', gsm: '' },
  forceWaypointIndex: 0,
  loadFromStorage: false,
  managerCollection: [],
  slip: { id: '', code: '', date: '' },
  waypointCollection: [],
  waypointList: [],
  waypoint: {
    accessDescription: '',
    address: '',
    arrivedAt: 0,
    comment: '',
    status: '0',
    done: false,
    error: { code: 0, picture: '' },
    finishedAt: 0,
    gpsCoords: { long: 0, lat: 0 },
    id: -1,
    index: -1,
    name: '',
    pickupCount: 0,
    pickupPicture: '',
    pickupRealCount: 0,
    pictureCollection: [],
    realGpsCoord: { long: 0, lat: 0 },
    shippingCodeIndex: 0,
    shippingCodes: [],
    shippingCount: 0,
    shippingRealCodes: [],
    waypointCodeIndex: 0,
    waypointCodes: [],
  },
};

const AppContext = React.createContext(defaultAppState);

const AppContextProvider = ({ children }) => {
  // The app access context
  const [appContextState, setAppContextState] = useState(defaultAppState);

  const STORAGE_NAME = `${name}_CONTEXT`;

  Pool.configSenders({
    putwaypoint: values => {
      return putWaypoint(values);
    },
  });

  // Car, Driver and Waypoints
  const {
    hideCarCodeBar,
    hideDriverCodeBar,
    rescueIsSearching,
    car,
    clues,
    conditionCollection,
    driver,
    forceWaypointIndex,
    loadFromStorage,
    managerCollection,
    slip,
    waypoint,
    waypointCollection,
    waypointList,
  } = appContextState;

  const getMyPosition = (timeout = 15000) => {
    return new Promise((resolve, reject) => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout,
      })
        .then(location => {
          console.warn(location);
          resolve({ lat: location.latitude, long: location.longitude });
        })
        .catch(error => {
          reject({ lat: 0, long: 0 });
        });
    });
  };

  const firstWaypointIndexNotDone = origin => {
    const from = origin || waypointCollection;
    const firstIndex = from.findIndex(wp => wp.status === '0');
    return firstIndex;
  };

  const firstWaypointNotDone = origin => {
    const from = origin || waypointCollection;
    const firstIndex = firstWaypointIndexNotDone(from);
    return firstIndex >= 0 && from ? from[firstIndex] : from[0];
  };

  const read = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(STORAGE_NAME)
        .then(rawValues => {
          const values = JSON.parse(rawValues);
          if (values && values.datas) resolve(values);
          else reject(new Error('Pas de données !'));
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // test if tour and car datas are still valuable
  const needDriverScan = () => {
    return new Promise((resolve, reject) => {
      read()
        .then(values => {
          if (!values) resolve(true);
          else if (!values.date) resolve(true);
          else if (Date.now() - values.date > 1000 * 60 * 60 * 4) resolve(true);
          else resolve(false);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // save all the datas of the current tour
  const save = params => {
    const values = {
      date: Date.now(),
      datas: params || appContextState,
    };
    return AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(values));
  };

  // build waypoint from an array
  const getWaypointFromArray = (command, index) => {
    debugger;
    return {
      accessDescription: command.observations,
      address: `${command.pnt_adr} ${command.pnt_cp} ${command.pnt_ville}`,
      arrivedAt: 0,
      comment: '',
      done: command.done,
      status: command.status,
      error: { code: 0, picture: '' },
      finishedAt: 0,
      gpsCoords: {
        long: command.pnt_lng,
        lat: command.pnt_lat,
      },
      id: command.id,
      index,
      labo: command.ord_nom,
      client: command.id_pnt,
      name: command.pnt_nom,
      pickupCount: command.nbr_enl,
      pickupPicture: '',
      pickupRealCount: 0,
      pictureCollection: command.pnt_pj,
      realGpsCoord: { long: 0, lat: 0 },
      shippingCodeIndex: 0,
      shippingCodes: command.cab_liv,
      shippingCount: command.nbr_liv,
      shippingRealCodes: [],
      waypointCodeIndex: 0,
      waypointCodes: command.cab_pnt,
    };
  };

  const getWaypointList = values => {
    const retValues = values
      .map((item, index) => {
        return {
          key: index,
          id: item.id,
          done: item.done,
          status: item.status,
          name: item.pnt_nom,
          city: `${item.pnt_cp} ${item.pnt_ville}`,
          ord: item.ord_nom,
        };
      })
      .filter(item => !(item.done || item.status !== '0'))
      .filter(item => item.id !== waypoint.id);
    return retValues;
  };

  // load all the datas of the current tour
  const load = () => {
    return new Promise((resolve, reject) => {
      read()
        .then(rawdatas => {
          const { date, datas } = rawdatas;
          debugger;
          if (datas && datas.waypointCollection) {
            const wpcoll = datas.waypointCollection.filter(
              item => !(item.done || item.status !== '0'),
            );
            const firstIndex = firstWaypointIndexNotDone(wpcoll);
            setAppContextState(state => ({
              ...state,
              ...datas,
              loadFromStorage: true,
              forceWaypointIndex: firstIndex,
              waypointCollection: wpcoll,
              waypointList: getWaypointList(wpcoll),
              waypoint: getWaypointFromArray(wpcoll[firstIndex], firstIndex),
            }));
            Pool.flush();
            resolve(true);
          }
          resolve(false);
        })
        .catch(err => {
          resolve(false);
        });
    });
  };

  const clear = () => {
    return new Promise((resolve, reject) => {
      const values = {
        date: Date.now(),
        datas: null,
      };
      AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(values))
        .then(() => {
          Pool.clear();
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  /**
   * Call the API to get the car linked to this codebar
   */
  const getCarDatas = num =>
    new Promise((resolve, reject) => {
      getIdentVehicle(num)
        .then(value => {
          setAppContextState(state => ({
            ...state,
            car: {
              id: value.vehicule_id,
              immat: value.vehicule_immat,
              alert: value.vehicule_alerte,
            },
          }));
          resolve(value);
        })
        .catch(err => reject(err));
    });

  // const saveCar = () => {};

  /**
   * Call the API to get the driver linked to this codebar
   */
  const getDriverDatas = num =>
    new Promise((resolve, reject) => {
      getIdentTour(num)
        .then(values => {
          const newState = {
            slip: {
              id: values.bordereau_id,
              code: values.bordereau_code,
              date: values.bordereau_date,
            },
            driver: {
              id: values.chauffeur_id,
              firstname: values.chauffeur_prenom,
              lastname: values.chauffeur_nom,
              gsm: values.chauffeur_portable,
            },
          };
          setAppContextState(state => ({ ...state, ...newState }));
          resolve(values);
        })
        .catch(err => reject(err));
    });

  /**
   * just set the GSM number
   */
  const setGSMNumber = number => {
    putGsmNumber({
      chauffeur_id: driver.id,
      num_tel: number,
    })
      .then(() => {
        setAppContextState(state => ({
          ...state,
          driver: {
            ...state.driver,
            gsm: number,
          },
        }));
      })
      .catch(err => {
        console.warn('setGSMNumber', err);
      });
  };

  /**
   * Get the waypoint from the server
   */
  const getWaypointDatas = num =>
    new Promise((resolve, reject) => {
      getCommands(num)
        .then(value => {
          debugger;
          const wpcoll =
            (value &&
              value.commandes
                .filter(item => !(item.done || item.status !== '0'))
                .map(wp => ({ ...wp, done: false }))) ||
            [];
          // :(value && value.commandes.map(wp => ({ ...wp, done: false }))) || [],
          setAppContextState(state => ({
            ...state,
            forceWaypointIndex: 0, // firstWaypointIndexNotDone(value && value.commandes),
            waypointList: [],
            conditionCollection: (value && value.problemes) || [],
            tourManager: (value && value.tournee) || { nom: '', rel: '' },
            managerCollection: (value && value.responsables) || [],
            waypointCollection: wpcoll,
            waypoint: getWaypointFromArray(wpcoll[0], 0), // firstWaypointNotDone(value && value.commandes), // getWaypointFromArray(value.commandes[firstIndex], firstIndex),
          }));
          resolve(wpcoll);
        })
        .catch(err => reject(err));
    });

  /**
   * Open the map screen/app with desired location
   */
  const openMapScreen = () => {
    const params = {
      zoom: 20,
      query: appContextState.waypoint.address,
      end: appContextState.waypoint.address,
    };
    if (appContextState.waypoint.gpsCoords.long > 0) {
      params.longitude = appContextState.waypoint.gpsCoords.long;
      params.latitude = appContextState.waypoint.gpsCoords.lat;
    }
    openMap(params);
  };

  /**
   * Get a waypoint from the collection by index
   */
  const selectWaypointByIndex = index => {
    const command = appContextState.waypointCollection[index];
    if (command) {
      const wp = getWaypointFromArray(command, index);
      if (wp.arrivedAt === 0) wp.arrivedAt = Date.now();
      setAppContextState(state => ({
        ...state,
        forceWaypointIndex: index,
        waypoint: wp,
      }));
    }
  };

  /**
   * Select a waypoint by id
   */
  const selectWaypointById = id => {
    const index = appContextState.waypointCollection.findIndex(item => item.id === id);
    selectWaypointByIndex(index);
  };

  // send the waypoint datas to the server
  const sendWaypointToServer = wp => {
    return new Promise((resolve, reject) => {
      getMyPosition().then(coords => {
        debugger;
        const values = {
          num: wp.id,
          bordereau_id: slip.id,
          chauffeur_id: driver.id,
          vehicule_id: car.id,
          dt1: wp.arrivedAt,
          dt2: wp.finishedAt,
          lat: coords.lat,
          lng: coords.long,
          erreur: wp.error.code,
          nb_liv: wp.shippingRealCodes.length,
          nb_enl: wp.pickupRealCount,
          cb_liv: wp.shippingRealCodes,
          cb_enl: [''],
          photo_condition: wp.error.picture,
          photo_blocage: '',
          photo_enlevement: wp.pickupPicture,
          observations: wp.comment,
        };
        Pool.add(values, 'putwaypoint')
          .then(() => {
            setTimeout(() => {
              Pool.flush();
            }, 25);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  };

  // start a new waypoint
  const startNewWaypoint = () => {
    let currentState = null;
    return new Promise((resolve, reject) => {
      setAppContextState(state => {
        currentState = {
          ...state,
          waypoint: {
            ...state.waypoint,
            arrivedAt: Date.now(),
            realGpsCoord: { long: 0, lat: 0 },
          },
        };
        return currentState;
      });
      resolve(currentState);
    });
  };

  // Mark the waypoint has ended and send it to server
  const endWaypoint = comment => {
    return new Promise((resolve, reject) => {
      const state = { ...appContextState };
      const newWaypointCollection = [...state.waypointCollection];
      newWaypointCollection[waypoint.index].done = true;
      const newWaypoint = {
        ...state.waypoint,
        comment,
        finishedAt: Date.now(),
        done: true,
      };
      newWaypointCollection[waypoint.index].status = newWaypoint.error ? '2' : '1';
      const newOne = {
        ...state,
        waypointCollection: newWaypointCollection,
        waypoint: newWaypoint,
      };

      sendWaypointToServer(newWaypoint)
        .then(ret => {
          save(newOne);
          setAppContextState(newOne);
          resolve(newOne);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // is there any waypoint to visit
  const needToVisitAnotherWaypoint = () => {
    if (!waypointCollection || waypointCollection.length === 0) return false;
    const validWaypoints = firstWaypointIndexNotDone(waypointCollection);
    return validWaypoints > 0;
  };

  // set the current waypoint to the next one
  const selectNextWaypoint = callback => {
    if (!waypointCollection || waypointCollection.length === 0) {
      callback();
    } else {
      selectWaypointByIndex(firstWaypointIndexNotDone());
      callback();
    }
  };

  // all the waypoint are done so close the day
  const endTour = callback => {
    callback();
  };

  /**
   * On driver.slip change rebuild the collection of waypoint
   */
  useEffect(() => {
    const useEffectAsync = async s => {
      try {
        if (s && s.id > 0) {
          const value = await getWaypointDatas(s.id);
          if (value) {
            setAppContextState(state => {
              return {
                ...state,
                waypointCollection: value,
                waypoint:
                  state.waypointCollection.length === 0
                    ? getWaypointFromArray(value[0], 0)
                    : getWaypointFromArray(value[forceWaypointIndex], forceWaypointIndex),
              };
            });
          }
        }
      } catch (err) {
        Alert.alert(splashname, 'Impossible de construire la tournée !');
      }
    };

    if (!loadFromStorage) useEffectAsync(slip);
  }, [slip]);

  /**
   * On collection change, reselect the first waypoint and rebuild the list BT00249316 V0000017
   */
  useEffect(() => {
    const useEffectAsync = async v => {
      try {
        if (v && v.length > 0) {
          setAppContextState(state => ({
            ...state,
            waypointList: getWaypointList(v),
          }));
        }
      } catch (err) {
        console.warn(err);
        Alert.alert(splashname, 'Impossible de reconstruire la tournée !');
      }
    };

    useEffectAsync(waypointCollection);
  }, [waypointCollection, waypoint]);

  // Load some fake datas
  const loadFakeContext = () => {
    if (isStory()) {
      getDriverDatas('BT00249316');
      // getCarDatas('V0000017');
      // selectWaypointByIndex(0);
    }
  };

  // store in local storage some datas that should be sent away
  const storeClue = ({ condition, picture }) => {
    return new Promise((resolve, reject) => {
      setAppContextState(state => ({
        ...state,
        waypoint: {
          ...state.waypoint,
          error: { code: condition.id, picture },
        },
      }));
      resolve();
    });
  };

  // test if the current waypoint barcode index is the last ?
  const needAnotherWaypointCode = () => {
    const { waypointCodeIndex, waypointCodes } = waypoint;
    return waypointCodeIndex < waypointCodes.length - 1;
  };

  // the next barcode for this waypoint
  const nextWaypointCode = callback => {
    setAppContextState(state => ({
      ...state,
      waypoint: {
        ...state.waypoint,
        waypointCodeIndex: state.waypoint.waypointCodeIndex + 1,
      },
    }));
    callback();
  };

  const saveCurrentWaypointCode = num => {
    setAppContextState(state => ({
      ...state,
      waypoint: {
        ...state.waypoint,
        shippingRealCodes: [...state.waypoint.shippingRealCodes, num],
      },
    }));
  };

  // test if the current shipment barcode index is the last ?
  const needAnotherShipmentCode = () => {
    const { shippingCodeIndex, shippingCodes } = waypoint;
    return shippingCodeIndex < shippingCodes.length - 1;
  };

  // the next barcode for this waypoint
  const nextShipmentCode = callback => {
    setAppContextState(state => ({
      ...state,
      waypoint: {
        ...state.waypoint,
        shippingCodeIndex: state.waypoint.shippingCodeIndex + 1,
      },
    }));
    callback();
  };

  // make a call to all managers, only managed by the backoffice
  const contactAllManagers = () => {
    setAppContextState(state => ({ ...state, rescueIsSearching: true }));
    return new Promise((resolve, reject) => {
      getMyPosition().then(coords => {
        debugger;
        putSos({
          bordereau_id: slip.id,
          chauffeur_id: driver.id,
          vehicule_id: car.id,
          lat: coords.lat,
          lng: coords.long,
        })
          .then(() => {
            setAppContextState(state => ({ ...state, rescueIsSearching: false }));
            resolve();
          })
          .catch(err2 => {
            setAppContextState(state => ({ ...state, rescueIsSearching: false }));
            reject(err2);
          });
      });
    });
  };

  // Set the number of package to pick
  const setPickupCount = value => {
    setAppContextState(state => ({
      ...state,
      waypoint: {
        ...state.waypoint,
        pickupRealCount: value,
      },
    }));
  };

  // Set picture of the pickup
  const storePickupPicture = value => {
    setAppContextState(state => ({
      ...state,
      waypoint: {
        ...state.waypoint,
        pickupPicture: value,
      },
    }));
  };

  const setHideCarBarCodeReader = hide => {
    console.warn('SETHIDECAR', hide);
    setAppContextState(state => ({
      ...state,
      hideCarCodeBar: hide,
    }));
  };

  const setHideDriverBarCodeReader = hide => {
    setAppContextState(state => ({
      ...state,
      hideDriverCodeBar: hide,
      hideCarCodeBar: !hide,
    }));
  };

  const sendPictureToBeUnblocked = async picture => {
    // TODO: On travaille ici
    return true;
    // throw new Error('Bad');
  };

  // The renderer
  return (
    <AppContext.Provider
      value={{
        hideCarCodeBar,
        hideDriverCodeBar,
        rescueIsSearching,
        car,
        clues,
        conditionCollection,
        driver,
        forceWaypointIndex,
        loadFromStorage,
        managerCollection,
        slip,
        waypoint,
        waypointCollection,
        waypointList,
        clear,
        contactAllManagers,
        endTour,
        endWaypoint,
        firstWaypointIndexNotDone,
        getCarDatas,
        getDriverDatas,
        getWaypointDatas,
        load,
        loadFakeContext,
        needAnotherShipmentCode,
        needAnotherWaypointCode,
        needDriverScan,
        needToVisitAnotherWaypoint,
        nextShipmentCode,
        nextWaypointCode,
        openMapScreen,
        save,
        saveCurrentWaypointCode,
        selectNextWaypoint,
        selectWaypointById,
        selectWaypointByIndex,
        setGSMNumber,
        setPickupCount,
        startNewWaypoint,
        storeClue,
        storePickupPicture,
        setHideCarBarCodeReader,
        setHideDriverBarCodeReader,
        sendPictureToBeUnblocked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { defaultAppState, AppContextProvider };
