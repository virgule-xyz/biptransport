/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import openMap from 'react-native-open-maps';
import { getCommands, getIdentTour, getIdentVehicle, isStory, putSos, Pool } from '@webservices';

/**
 * The whole app context
 * This context allows for the management of all crossing points and associated actions
 */
const defaultAppState = {
  car: { id: '', immat: '', alert: '' },
  slip: { id: '', code: '', date: '' },
  driver: { id: '', firstname: '', lastname: '', gsm: '' },
  managerCollection: [],
  clues: [],
  waypointCollection: [],
  conditionCollection: [],
  waypointList: [],
  forceWaypointIndex: 0,
  pool: null,
  waypoint: {
    index: -1,
    done: false,
    name: '',
    address: '',
    shippingCount: 0,
    pickupCount: 0,
    accessDescription: '',
    id: -1,
    waypointCodeIndex: 0,
    waypointCodes: [],
    gpsCoords: { long: 0, lat: 0 },
    pictureCollection: [],
  },
};

const AppContext = React.createContext(defaultAppState);

const AppContextProvider = ({ children }) => {
  // The app access context
  const [appContextState, setAppContextState] = useState(defaultAppState);

  // Car, Driver and Waypoints
  const {
    car,
    slip,
    driver,
    clues,
    forceWaypointIndex,
    managerCollection,
    conditionCollection,
    waypointCollection,
    waypointList,
    waypoint,
    pool,
  } = appContextState;

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

  /**
   * just set the GSM number
   */
  const setGSMNumber = number => {
    return new Promise((resolve, reject) => {
      resolve(number);
    });
  };

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

  const getWaypointFromArray = (command, index) => ({
    index,
    done: command.done,
    name: command.pnt_nom,
    address: `${command.pnt_adr} ${command.pnt_cp} ${command.pnt_ville}`,
    shippingCount: command.nbr_liv,
    pickupCount: command.nbr_enl,
    accessDescription: command.observations,
    id: command.id,
    waypointCodeIndex: 0,
    waypointCodes: command.cab_pnt,
    gpsCoords: {
      long: command.pnt_lng,
      lat: command.pnt_lat,
    },
    pictureCollection: command.pnt_pj,
  });

  /**
   * Get the waypoint from the server
   */
  const getWaypointDatas = num =>
    new Promise((resolve, reject) => {
      getCommands(num)
        .then(value => {
          setAppContextState(state => ({
            ...state,
            forceWaypointIndex: 0,
            waypointList: [],
            conditionCollection: (value && value.problemes) || [],
            tourManager: (value && value.tournee) || { nom: '', rel: '' },
            managerCollection: (value && value.responsables) || [],
            waypointCollection:
              (value && value.commandes.map(wp => ({ ...wp, done: false }))) || [],
            waypoint: getWaypointFromArray(value.commandes[0], 0),
          }));
          resolve(value.commandes);
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
      setAppContextState(state => ({
        ...state,
        forceWaypointIndex: index,
        waypoint: getWaypointFromArray(command, index),
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

  const endWaypoint = () => {
    setAppContextState(state => {
      const newWaypointCollection = [...state.waypointCollection];
      newWaypointCollection[waypoint.index].done = true;
      const newWaypoint = {
        ...state.waypoint,
        done: true,
      };

      const newOne = {
        ...state,
        waypointCollection: newWaypointCollection,
        waypoint: newWaypoint,
      };

      return newOne;
    });
  };

  const firstWaypointIndexNotDone = () => {
    // if (waypointCollection.length === 0) return 0;
    const firstIndex = waypointCollection.findIndex(wp => !wp.done);
    console.warn('FIRST INDEX', firstIndex);
    return firstIndex;
  };

  // is there any waypoint to visit
  const needToVisitAnotherWaypoint = () => {
    if (!waypointCollection || waypointCollection.length === 0) return false;
    const validWaypoints = waypointCollection.filter(wp => !wp.done);
    return validWaypoints.length > 0;
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
    };
    useEffectAsync(slip);
  }, [slip]);

  /**
   * On collection change, reselect the first waypoint and rebuild the list BT00249316 V0000017
   */
  useEffect(() => {
    const useEffectAsync = async v => {
      if (v && v.length > 0) {
        setAppContextState(state => ({
          ...state,
          waypointList: v.map((item, index) => {
            return {
              key: index,
              id: item.id,
              done: item.done,
              name: item.pnt_nom,
              city: `${item.pnt_cp} ${item.pnt_ville}`,
              ord: item.ord_nom,
            };
          }),
        }));
      }
    };

    useEffectAsync(waypointCollection);
  }, [waypointCollection]);

  // Load some fake datas
  const loadFakeContext = () => {
    if (isStory()) {
      getDriverDatas('BT00249316');
      // getCarDatas('V0000017');
      // selectWaypointByIndex(0);
    }
  };

  // save the new bad condition and save this on webservice
  const saveCondition = cond => {
    Alert.alert(cond.name);
  };

  // store in local storage some datas that should be sent away
  const storeClue = ({ condition, picture }) => {};

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

  // make a call to all managers, only managed by the backoffice
  const contactAllManagers = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          putSos({
            bordereau_id: slip.id,
            chauffeur_id: driver.id,
            vehicule_id: car.id,
            lat: coords.latitude,
            lng: coords.longitude,
          })
            .then(() => {
              resolve();
            })
            .catch(err => reject(err));
        },
        err => {
          reject(err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30 * 1000,
          timeout: 5 * 60 * 1000,
        },
      );
    });
  };

  // The renderer
  return (
    <AppContext.Provider
      value={{
        car,
        clues,
        conditionCollection,
        contactAllManagers,
        driver,
        endTour,
        endWaypoint,
        forceWaypointIndex,
        getCarDatas,
        getDriverDatas,
        getWaypointDatas,
        loadFakeContext,
        managerCollection,
        needAnotherWaypointCode,
        needToVisitAnotherWaypoint,
        nextWaypointCode,
        openMapScreen,
        pool,
        saveCondition,
        selectNextWaypoint,
        selectWaypointById,
        selectWaypointByIndex,
        setGSMNumber,
        slip,
        storeClue,
        waypoint,
        waypointCollection,
        waypointList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { defaultAppState, AppContextProvider };
