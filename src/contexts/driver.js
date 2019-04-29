import React, { useState } from 'react';

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
    setDriverContextState(prevState => ({ ...prevState, gsmNumber: number }));
  };

  // Call the API to get the driver linked to this codebar
  const myGetDriverDatas = codebar => {
    return new Promise((resolve, reject) => {
      if (codebar === '123456') {
        setDriverContextState(prevState => {
          // FIXME: Use the API with the mapper from the API to this interface
          const newState = {
            ...prevState,
            gsmNumber: '0695144942',
            code: '1',
            firstname: 'Pierre',
            lastname: 'Canthelou',
          };
          return newState;
        });
        resolve();
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Mauvais code');
      }
    });
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
