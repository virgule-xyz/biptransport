/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import openMap from 'react-native-open-maps';

/**
 * ECe contexte permet de gérer l'ensemble des points de passage et les actions associéers
 */
const defaultWaypointState = {
  waypointIndex: -1,
  waypointCard: 0,
  waypointName: '',
  waypointAddress: '',
  waypointShippingCount: 0,
  waypointPickupCount: 0,
  waypointAccessDescription: '',
  waypointId: -1,
  waypointGpsCoords: { long: 0, lat: 0 },
};

const WaypointContext = React.createContext(defaultWaypointState);

const WaypointContextProvider = ({ children }) => {
  // The whole and full collection of waypoints
  const [waypointCollectionState, setWaypointCollectionState] = useState(() => {
    const WAYPOINTS = require('../webservices/commands.json');
    return WAYPOINTS.commandes;
  });

  // The whole and full collection of waypoints FOR LIST
  const [waypointListState, setWaypointListState] = useState([]);

  // The only current waypoint
  const [waypointContextState, setWaypointContextState] = useState(defaultWaypointState);

  /**
   * Open the map screen/app with desired location
   */
  const openMapScreen = () => {
    const params = {
      zoom: 20,
      query: waypointContextState.waypointAddress,
      end: waypointContextState.waypointAddress,
    };
    if (waypointContextState.waypointGpsCoords.long > 0) {
      params.longitude = waypointContextState.waypointGpsCoords.long;
      params.latitude = waypointContextState.waypointGpsCoords.lat;
    }
    console.warn(params);
    openMap(params);
  };

  /**
   * Get a waypoint from the collection by index
   * @param {{number}} index index of the element
   */
  const selectWaypointByIndex = index => {
    const command = waypointCollectionState[index];

    setWaypointContextState({
      waypointIndex: index,
      waypointCard: waypointCollectionState.length,
      waypointName: command.pnt_nom,
      waypointAddress: `${command.pnt_adr} ${command.pnt_cp} ${command.pnt_ville}`,
      waypointShippingCount: command.nbr_liv,
      waypointPickupCount: command.nbr_enl,
      waypointAccessDescription: command.observations,
      waypointId: command.id,
      waypointGpsCoords: {
        long: command.pnt_lng,
        lat: command.pnt_lat,
      },
    });
  };

  // get the first element of collection and format list items
  useEffect(() => {
    if (waypointCollectionState.length > 0)
      selectWaypointByIndex(Math.floor(Math.random() * waypointCollectionState.length));
    setWaypointListState(
      waypointCollectionState.map((item, index) => {
        return {
          key: index,
          id: item.id,
          name: item.pnt_nom,
          city: `${item.pnt_cp} ${item.pnt_ville}`,
          ord: item.ord_nom,
        };
      }),
    );
  }, [waypointCollectionState]);

  /**
   * Select a waypoint by id
   * @param {{number}} id // id of waypoint to select
   */
  const selectWaypointById = id => {
    const index = waypointCollectionState.findIndex(item => item.id === id);
    selectWaypointByIndex(index);
  };

  const {
    waypointIndex,
    waypointCard,
    waypointName,
    waypointAddress,
    waypointShippingCount,
    waypointPickupCount,
    waypointAccessDescription,
    waypointId,
    waypointGpsCoords,
  } = waypointContextState;

  return (
    <WaypointContext.Provider
      value={{
        waypointIndex,
        waypointCard,
        waypointName,
        waypointAddress,
        waypointShippingCount,
        waypointPickupCount,
        waypointAccessDescription,
        waypointId,
        waypointGpsCoords,
        waypointCollectionState,
        waypointListState,
        openMapScreen,
        selectWaypointById,
      }}
    >
      {children}
    </WaypointContext.Provider>
  );
};

export default WaypointContext;
export { defaultWaypointState, WaypointContextProvider };
