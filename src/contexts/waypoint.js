import React, { useState } from 'react';

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
};

const WaypointContext = React.createContext(defaultWaypointState);

const WaypointContextProvider = ({ children }) => {
  const [waypointContextState, setWaypointContextState] = useState(() => {
    setTimeout(() => {
      setWaypointContextState({
        waypointIndex: '1',
        waypointCard: '24',
        waypointName: `Laboratoire Premier
    Centre dentaire Choisy`,
        waypointAddress: `5 rue de l'église
    94600 Choisy le roi`,
        waypointShippingCount: '3',
        waypointPickupCount: '1',
        waypointAccessDescription: `Voluptatem pariatur sed. Ipsa eos illo corporis harum sit cupiditate ut.`,
        waypointId: '2',
      });
    }, 1000);
    return defaultWaypointState;
  });

  const {
    waypointIndex,
    waypointCard,
    waypointName,
    waypointAddress,
    waypointShippingCount,
    waypointPickupCount,
    waypointAccessDescription,
    waypointId,
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
      }}
    >
      {children}
    </WaypointContext.Provider>
  );
};

export default WaypointContext;
export { defaultWaypointState, WaypointContextProvider };
