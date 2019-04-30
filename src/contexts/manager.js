import React, { useState } from 'react';

/**
 * - Récupérer la liste de responsables
 * - Appeler un responsable
 * - Scanner un code barre ou entrer un code manuellement
 * - Envoyer un SMS à tous les responsables
 */
const defaultManagersState = {
  managers: [],

  // eslint-disable-next-line no-unused-vars
  makePhonecall: manager => {},
};

const ManagersContext = React.createContext(defaultManagersState);

const ManagersContextProvider = ({ children }) => {
  const loadManagers = () => {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve([
            { id: 1, name: 'Responsable #1' },
            { id: 3, name: 'Responsable #2' },
            { id: 7, name: 'Responsable #3' },
          ]),
        1000,
      );
    });
  };

  // eslint-disable-next-line no-unused-vars
  const [managersContextState, setManagersContextState] = useState(() => {
    loadManagers().then(d => setManagersContextState({ managers: d }));
    return defaultManagersState;
  });

  const { managers } = managersContextState;

  const myMakePhonecall = manager => {
    console.warn('call manager', manager);
  };

  return (
    <ManagersContext.Provider
      value={{
        managers,
        makePhonecall: myMakePhonecall,
      }}
    >
      {children}
    </ManagersContext.Provider>
  );
};

export default ManagersContext;
export { defaultManagersState, ManagersContextProvider };
