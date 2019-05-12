import React, { useState } from 'react';
import { setGsmNumber, getIdentTour } from '@webservices';

/**
 * Expliquer ce que fait le contexte et comment utiliser les states, TEST avec BT00249316
 */
const defaultDriverState = {
  slip: { id: '', code: '', date: '' },
  driver: { id: '', firstname: '', lastname: '', gsm: '' },
};

const DriverContext = React.createContext(defaultDriverState);

const DriverContextProvider = ({ children }) => {
  // the whole context state
  const [driverContextState, setDriverContextState] = useState(defaultDriverState);

  // just set the GSM number
  const setGSMNumber = number => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  };

  // Call the API to get the driver linked to this codebar
  const getDriverDatas = codebar =>
    new Promise((resolve, reject) => {
      getIdentTour(codebar)
        .then(values => {
          setDriverContextState({
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
          });
          resolve(values);
        })
        .catch(err => reject(err));
    });

  const { slip, driver } = driverContextState;

  return (
    <DriverContext.Provider
      value={{
        slip,
        driver,
        setGSMNumber,
        getDriverDatas,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export default DriverContext;
export { defaultDriverState, DriverContextProvider };
