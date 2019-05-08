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
  const [waypointCollectionState, setWaypointCollectionState] = useState(() => {
    const WAYPOINTS = require('./waypoints.json');
    return WAYPOINTS.commandes;
  });
  const [waypointContextState, setWaypointContextState] = useState(defaultWaypointState);
  // const [waypointContextState, setWaypointContextState] = useState(() => {
  //   setTimeout(() => {
  //     setWaypointContextState({
  //       waypointIndex: '1',
  //       waypointCard: '24',
  //       waypointName: `Laboratoire Premier
  //   Centre dentaire Choisy`,
  //       waypointAddress: `5 rue de l'église
  //   94600 Choisy le roi`,
  //       waypointShippingCount: '3',
  //       waypointPickupCount: '1',
  //       waypointAccessDescription: `Voluptatem pariatur sed. Ipsa eos illo corporis harum sit cupiditate ut.`,
  //       waypointId: '2',
  //       waypointGpsCoords: { long: 2.4075876, lat: 48.7660259 },
  //       waypointCollection: WAYPOINTS.commandes,
  //     });
  //   }, 1000);
  //   return defaultWaypointState;
  // });

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

  useEffect(() => {
    if (waypointCollectionState.length > 0)
      selectWaypointByIndex(Math.floor(Math.random() * waypointCollectionState.length));
  }, [waypointCollectionState]);

  const selectWaypointById = id => {
    const index = waypointContextState.waypointCollection.findIndex(item => item.id === id);
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
