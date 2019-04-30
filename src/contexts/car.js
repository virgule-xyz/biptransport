import React, { useState, useEffect } from 'react';
import { checkBarcode } from '@webservices';

/**
 * Expliquer ce que fait le contexte et comment utiliser les states
 */
const defaultCarState = {
  brand: '',
  model: '',
  license: '',
  comment: '',
  getCarDatas: codebar => new Promise(reject => reject(codebar)),
};

const CarContext = React.createContext(defaultCarState);

const CarContextProvider = ({ children }) => {
  const [carContextState, setCarContextState] = useState(defaultCarState);

  const { brand, model, license, comment } = carContextState;

  // Call the API to get the car linked to this codebar
  const myGetCarDatas = codebar => {
    return checkBarcode({ codebar, ws: 'car', setContextState: setCarContextState });
  };

  return (
    <CarContext.Provider
      value={{
        brand,
        model,
        license,
        comment,
        getCarDatas: myGetCarDatas,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarContext;
export { defaultCarState, CarContextProvider };
