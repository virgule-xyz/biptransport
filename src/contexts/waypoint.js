/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useMemo, useContext, useState, useCallback } from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: 'green',
  diffNameColor: 'darkturquoise',
});

// the default context state
const waypointContextDefaultState = {
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
};

// the creation of the state
const WaypointContext = React.createContext(waypointContextDefaultState);

// // define context aware functions calling context functions
// const WaypointContextFunction = () => {
//   const context = useContext(WaypointContext);
//   context.anIndependentFunctionThatChangeState();
// };

// the context provider and builder
const WaypointContextProvider = ({ children }) => {
  // the context state
  const [waypointContextState, setWaypointContextState] = useState(waypointContextDefaultState);

  // memoized function definitions (state independent)
  //   const anIndependentFunctionThatChangeState = useCallback(() => {
  //     setWaypointContextState(prevState => ({ ...prevState }));
  //   }, []);

  // build waypoint from an array
  const setWaypointFromArray = useCallback((command, index) => {
    setWaypointContextState({
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
    });
  });

  // the memoized context accessor
  const getWaypointContext = useMemo(
    () => ({
      //   anIndependentFunctionThatChangeState,
      setWaypointFromArray,
    }),
    [],
  );

  // return the provider with content as render function based on context state
  return (
    <WaypointContext.Provider value={getWaypointContext()}>{children}</WaypointContext.Provider>
  );
};

WaypointContext.whyDidYouRender = true;

export default WaypointContext;
export { waypointContextDefaultState, WaypointContextProvider };
