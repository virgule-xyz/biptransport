import React, { useState, useEffect } from 'react';

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
    return new Promise((resolve, reject) => {
      if (codebar === '123456') {
        setCarContextState(prevState => {
          // FIXME: Use the API with the mapper from the API to this interface
          const newState = {
            ...prevState,
            brand: 'Renault',
            model: 'Zoé',
            license: 'EB085TN',
            comment: '',
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
