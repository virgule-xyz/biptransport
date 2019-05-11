/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getIdentVehicle } from '@webservices';

/**
 * Expliquer ce que fait le contexte et comment utiliser les states
 */
const defaultCarState = {
  id: '',
  immat: '',
  alert: '',
  getCarDatas: codebar => new Promise(reject => reject(codebar)),
};

const CarContext = React.createContext(defaultCarState);

const CarContextProvider = ({ children }) => {
  const [carContextState, setCarContextState] = useState(defaultCarState);

  const { id, immat, alert } = carContextState;

  // Call the API to get the car linked to this codebar
  const getCarDatas = codebar =>
    new Promise((resolve, reject) => {
      getIdentVehicle(codebar)
        .then(value => {
          setCarContextState({
            id: value.vehicule_id,
            immat: value.vehicule_immat,
            alert: value.vehicule_alerte,
          });
          resolve(value);
        })
        .catch(err => reject(err));
    });

  return (
    <CarContext.Provider
      value={{
        id,
        immat,
        alert,
        getCarDatas,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarContext;
export { defaultCarState, CarContextProvider };
