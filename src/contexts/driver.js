import React, { useState } from 'react';
import { checkBarcode, setGsmNumber } from '@webservices';

/**
 * Expliquer ce que fait le contexte et comment utiliser les states
 */
const defaultDriverState = {
  gsmNumber: '',
  code: '',
  firstname: '',
  lastname: '',
  setGSMNumber: () => {},
  getDriverDatas: codebar => new Promise(reject => reject(codebar)),
};

const DriverContext = React.createContext(defaultDriverState);

const DriverContextProvider = ({ children }) => {
  // the whole context state
  const [driverContextState, setDriverContextState] = useState(defaultDriverState);

  // just set the GSM number
  const mySetGsmNumber = number => {
    return new Promise((resolve, reject) => {
      setGsmNumber({ code: driverContextState.code, gsmNumber: number })
        .then(() => {
          setDriverContextState(prevState => ({ ...prevState, gsmNumber: number }));
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  // Call the API to get the driver linked to this codebar
  const myGetDriverDatas = codebar => {
    return checkBarcode({ codebar, ws: 'driver', setContextState: setDriverContextState });
  };

  const { gsmNumber, code, firstname, lastname } = driverContextState;

  return (
    <DriverContext.Provider
      value={{
        gsmNumber,
        code,
        firstname,
        lastname,
        setGSMNumber: mySetGsmNumber,
        getDriverDatas: myGetDriverDatas,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export default DriverContext;
export { defaultDriverState, DriverContextProvider };
