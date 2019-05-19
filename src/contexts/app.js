/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import openMap from 'react-native-open-maps';
import { getCommands, getIdentTour, getIdentVehicle, isTest } from '@webservices';

/**
 * The whole app context
 * This context allows for the management of all crossing points and associated actions
 */
const defaultAppState = {
  car: { id: '', immat: '', alert: '' },
  slip: { id: '', code: '', date: '' },
  driver: { id: '', firstname: '', lastname: '', gsm: '' },
  waypointCollection: [],
  conditionCollection: [],
  waypointList: [],
  waypoint: {
    index: -1,
    name: '',
    address: '',
    shippingCount: 0,
    pickupCount: 0,
    accessDescription: '',
    id: -1,
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
    conditionCollection,
    waypointCollection,
    waypointList,
    waypoint,
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

  /**
   * Get the waypoint from the server
   */
  const getWaypointDatas = num =>
    new Promise((resolve, reject) => {
      getCommands(num)
        .then(value => {
          setAppContextState(state => ({
            ...state,
            waypointList: [],
            conditionCollection: [{ name: 'Voie bouchée', id: 1 }, { name: 'Neige', id: 2 }],
            waypointCollection: (value && value.commandes) || [],
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
        waypoint: {
          index,
          name: command.pnt_nom,
          address: `${command.pnt_adr} ${command.pnt_cp} ${command.pnt_ville}`,
          shippingCount: command.nbr_liv,
          pickupCount: command.nbr_enl,
          accessDescription: command.observations,
          id: command.id,
          gpsCoords: {
            long: command.pnt_lng,
            lat: command.pnt_lat,
          },
          pictureCollection: command.pnt_pj,
        },
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

  /**
   * On driver.slip change rebuild the collection of waypoint
   */
  useEffect(() => {
    const useEffectAsync = async s => {
      if (s && s.id > 0) {
        const value = await getWaypointDatas(s.id);
        console.warn('getWaypointDatas', s.id);
        setAppContextState(state => {
          console.warn('setAppContextState', { ...state, waypointCollection: value });
          return { ...state, waypointCollection: value };
        });
      }
    };

    useEffectAsync(slip);
  }, [slip]);

  /**
   * On collection change, reselct the first waypoint and rebuild the list BT00249316 V0000017
   */
  useEffect(() => {
    const useEffectAsync = async v => {
      if (v && v.length > 0) {
        selectWaypointByIndex(0);
        setAppContextState(state => ({
          ...state,
          waypointList: v.map((item, index) => {
            return {
              key: index,
              id: item.id,
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
    if (isTest()) {
      getDriverDatas('BT00249316');
      // getCarDatas('V0000017');
      // selectWaypointByIndex(0);
    }
  };

  // save the new bad condition and save this on webservice
  const saveCondition = cond => {
    Alert.alert(cond.name);
  };

  // The renderer
  return (
    <AppContext.Provider
      value={{
        car,
        slip,
        driver,
        waypointCollection,
        conditionCollection,
        waypointList,
        waypoint,
        getCarDatas,
        setGSMNumber,
        getDriverDatas,
        getWaypointDatas,
        openMapScreen,
        selectWaypointByIndex,
        selectWaypointById,
        loadFakeContext,
        saveCondition,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { defaultAppState, AppContextProvider };
