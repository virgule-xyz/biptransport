/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import path from 'react-native-path';
import {
  getCommands,
  getIdentTour,
  getIdentVehicle,
  isStory,
  putSos,
  putWaypoint,
  putGsmNumber,
  putProof,
  Pool,
} from '@webservices';
import openMap from 'react-native-open-maps';
import GetLocation from 'react-native-get-location';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { splashname, name } from '../../package';

whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: 'green',
  diffNameColor: 'darkturquoise',
});

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
  codeToUnlock: null,
  videosCache: [],
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
    videos: [],
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

const AppContextProvider = ({ children, command = null }) => {
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
    videosCache,
    waypoint,
    waypointCollection,
    waypointList,
    codeToUnlock,
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

  const getFirstWaypointIndexNotDone = origin => {
    const from = origin || waypointCollection;
    if (from) {
      const firstIndex = from.findIndex(wp => wp.status === '0' || wp.done === false);
      return firstIndex;
    }
    return -1;
  };

  const getFirstWaypointNotDone = origin => {
    const from = origin || waypointCollection;
    if (from) {
      const firstIndex = getFirstWaypointIndexNotDone(origin);
      return firstIndex >= 0 && from ? from[firstIndex] : null;
    }
    return false;
  };

  const doRead = () => {
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
  const isNeedDriverScan = () => {
    return new Promise((resolve, reject) => {
      doRead()
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
  const doSave = params => {
    const values = {
      date: Date.now(),
      datas: params || appContextState,
    };
    return AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(values));
  };

  // build waypoint from an array
  const getWaypointFromArray = (command, index) => {
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
      videos: [...command.pnt_videos, 'http://www.virgule.xyz/big_buck_bunny.mp4'],
      videosCache: [],
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
  const doLoad = () => {
    return new Promise((resolve, reject) => {
      doRead()
        .then(rawdatas => {
          const { date, datas } = rawdatas;
          if (datas && datas.waypointCollection) {
            const wpcoll = datas.waypointCollection.filter(
              item => !(item.done || item.status !== '0'),
            );
            if (wpcoll.length > 0) {
              const firstIndex = getFirstWaypointIndexNotDone(wpcoll);
              if (firstIndex < 0) throw new Error();

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
          }
        })
        .catch(err => {
          Alert.alert(splashname, 'Impossible de construire la tournée !');
          reject(false);
        });
    });
  };

  const doClear = () => {
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
          const wpcoll =
            (value &&
              value.commandes
                .filter(item => !(item.done || item.status !== '0'))
                .map(wp => ({ ...wp, done: false }))) ||
            [];
          if (wpcoll.length === 0) {
            setAppContextState(state => ({
              ...state,
              forceWaypointIndex: 0, // getFirstWaypointIndexNotDone(value && value.commandes),
              waypointList: [],
              conditionCollection: [],
              tourManager: { nom: '', rel: '' },
              managerCollection: [],
              waypointCollection: [],
              waypoint: null,
            }));
            reject(false);
          } else {
            setAppContextState(state => ({
              ...state,
              forceWaypointIndex: 0, // getFirstWaypointIndexNotDone(value && value.commandes),
              waypointList: [],
              conditionCollection: (value && value.problemes) || [],
              tourManager: (value && value.tournee) || { nom: '', rel: '' },
              managerCollection: (value && value.responsables) || [],
              waypointCollection: wpcoll,
              waypoint: getWaypointFromArray(wpcoll[0], 0),
              // getFirstWaypointNotDone(value && value.commandes),
              // getWaypointFromArray(value.commandes[firstIndex], firstIndex),
            }));
            resolve(wpcoll);
          }
        })
        .catch(err => reject(err));
    });

  /**
   * Open the map screen/app with desired location
   */
  const doOpenMapScreen = useCallback(() => {
    const params = {
      zoom: 10,
      query: encodeURIComponent(appContextState.waypoint.address),
      end: encodeURIComponent(appContextState.waypoint.address),
    };
    let url = `https://waze.com/ul?q=${params.query}&navigate=yes&zoom=${params.zoom}`;

    if (appContextState.waypoint.gpsCoords.long > 0) {
      params.longitude = appContextState.waypoint.gpsCoords.long;
      params.latitude = appContextState.waypoint.gpsCoords.lat;
      const lat = parseFloat(params.latitude);
      const lng = parseFloat(params.longitude);
      url = `https://waze.com/ul?ll=${lat}%2C${lng}&navigate=yes&zoom=${params.zoom}`;
    }
    return Linking.openURL(url);
    // openMap(params);
  }, [appContextState.waypoint.address]);

  /**
   * Get a waypoint from the collection by index
   */
  const setWaypointByIndex = index => {
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
  const setWaypointById = id => {
    const index = appContextState.waypointCollection.findIndex(item => item.id === id);
    setWaypointByIndex(index);
  };

  // send the waypoint datas to the server
  const doSendWaypointToServer = wp => {
    return new Promise((resolve, reject) => {
      getMyPosition().then(coords => {
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
  const doStartNewWaypoint = () => {
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
  const setEndWaypoint = comment => {
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

      doSendWaypointToServer(newWaypoint)
        .then(ret => {
          doSave(newOne);
          setAppContextState(newOne);
          resolve(newOne);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // is there any waypoint to visit
  const isNeedToVisitAnotherWaypoint = () => {
    if (!waypointCollection || waypointCollection.length === 0) return false;
    const validWaypoints = getFirstWaypointIndexNotDone(waypointCollection);
    return validWaypoints >= 0;
  };

  // set the current waypoint to the next one
  const setNextWaypoint = callback => {
    if (!waypointCollection || waypointCollection.length === 0) {
      throw new Error('No more waypoints');
    } else {
      const firstIndex = getFirstWaypointIndexNotDone(waypointCollection);
      if (firstIndex < 0) throw new Error('No more waypoints');
      setWaypointByIndex(firstIndex);
      callback();
    }
  };

  // all the waypoint are done so close the day
  const doEndTour = callback => {
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
          if (value && value.length > 0) {
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
  const doLoadFakeContext = () => {
    if (isStory()) {
      getDriverDatas('BT00249316');
      // getCarDatas('V0000017');
      // setWaypointByIndex(0);
    }
  };

  useEffect(() => {
    doLoadFakeContext();
  }, []);

  // store in local storage some datas that should be sent away
  const setStoreClue = ({ condition, picture }) => {
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
  const isNeedAnotherWaypointCode = () => {
    const { waypointCodeIndex, waypointCodes } = waypoint;
    return waypointCodeIndex < waypointCodes.length - 1;
  };

  // the next barcode for this waypoint
  const setNextWaypointCode = callback => {
    setAppContextState(state => ({
      ...state,
      waypoint: {
        ...state.waypoint,
        waypointCodeIndex: state.waypoint.waypointCodeIndex + 1,
      },
    }));
    callback();
  };

  const setCurrentWaypointCode = num => {
    setAppContextState(state => ({
      ...state,
      waypoint: {
        ...state.waypoint,
        shippingRealCodes: [...state.waypoint.shippingRealCodes, num],
      },
    }));
  };

  // test if the current shipment barcode index is the last ?
  const isNeedAnotherShipmentCode = () => {
    const { shippingCodeIndex, shippingCodes } = waypoint;
    return shippingCodeIndex < shippingCodes.length - 1;
  };

  // the next barcode for this waypoint
  const getNextShipmentCode = callback => {
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
  const doContactAllManagers = () => {
    setAppContextState(state => ({ ...state, rescueIsSearching: true }));
    return new Promise((resolve, reject) => {
      getMyPosition().then(coords => {
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
        pickupRealCount: Math.max(0, value),
      },
    }));
  };

  // Set picture of the pickup
  const setStorePickupPicture = value => {
    setAppContextState(state => ({
      ...state,
      waypoint: {
        ...state.waypoint,
        pickupPicture: value,
      },
    }));
  };

  const setHideCarBarCodeReader = hide => {
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

  const setCodeToBeUnblocked = async picture => {
    const coords = await getMyPosition();
    const proof = {
      picture,
      lat: coords.lat,
      lng: coords.long,
      num: waypoint.id,
      bordereau_id: slip.id,
      chauffeur_id: driver.id,
      vehicule_id: car.id,
      dt: Date.now(),
    };
    const isDatasSent = await putProof(proof);

    if (isDatasSent.result.toLowerCase() === 'ok') {
      setAppContextState(state => ({
        ...state,
        codeToUnlock: isDatasSent.code,
      }));
      return true;
    }
    return false;
  };

  const getVideosToDownload = () => {
    const wpAll = waypointCollection.map((wp, wpIndex) => getWaypointFromArray(wp, wpIndex));
    const wpWithMovies = wpAll.length > 0 ? wpAll.filter(movs => movs.videos.length > 0) : [];
    const urlToDownload = [];
    wpWithMovies.forEach(movs =>
      movs.videos.map(mov =>
        urlToDownload.push({
          url: mov,
          name: `${movs.id}_${path.basename(mov)}`,
          wp: movs.id,
        }),
      ),
    );
    return urlToDownload;
  };

  const setVideosCache = videos => {
    setAppContextState(state => ({
      ...state,
      videosCache: videos,
    }));
  };

  const notMemoized = {
    car,
    clues,
    codeToUnlock,
    conditionCollection,
    driver,
    forceWaypointIndex,
    hideCarCodeBar,
    hideDriverCodeBar,
    loadFromStorage,
    managerCollection,
    rescueIsSearching,
    slip,
    videosCache,
    waypoint,
    waypointCollection,
    waypointList,
  };

  const memoized = useMemo(() => ({
    doClear,
    doContactAllManagers,
    doEndTour,
    doLoad,
    doLoadFakeContext,
    doOpenMapScreen,
    doSave,
    doStartNewWaypoint,
    getCarDatas,
    getDriverDatas,
    getFirstWaypointIndexNotDone,
    getFirstWaypointNotDone,
    getVideosToDownload,
    setVideosCache,
    getNextShipmentCode,
    getWaypointDatas,
    getWaypointFromArray,
    isNeedAnotherShipmentCode,
    isNeedAnotherWaypointCode,
    isNeedDriverScan,
    isNeedToVisitAnotherWaypoint,
    setCodeToBeUnblocked,
    setCurrentWaypointCode,
    setEndWaypoint,
    setGSMNumber,
    setHideCarBarCodeReader,
    setHideDriverBarCodeReader,
    setNextWaypoint,
    setNextWaypointCode,
    setPickupCount,
    setStoreClue,
    setStorePickupPicture,
    setWaypointById,
    setWaypointByIndex,
  }));

  // The renderer
  return (
    <AppContext.Provider value={{ ...memoized, ...notMemoized }}>{children}</AppContext.Provider>
  );
};

AppContext.whyDidYouRender = true;

export default AppContext;
export { defaultAppState, AppContextProvider };
