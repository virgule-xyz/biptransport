import React, { useState, useEffect, useContext } from 'react';
import { CSpace, CContent, CButton, CSpinner } from '@components';

/**
 * Le header et une liste de boutons permettant de joindre un manager
 */
const ScreenManagers = () => {
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

  const [managers, setManagers] = useState(() => {
    loadManagers().then(d => setManagers(d));
    return [];
  });

  const onPressManager = manager => {
    console.warn('Do something on manager', manager);
  };

  return (
    <CContent title="Vos responsables" fullscreen>
      {managers.length > 0 &&
        managers.map(manager => (
          <>
            <CButton light full label={manager.name} onPress={() => onPressManager(manager)} />
            <CSpace n={0.1} />
          </>
        ))}
      {managers.length === 0 && (
        <>
          <CSpace n={2} />
          <CSpinner />
        </>
      )}
    </CContent>
  );
};

export default ScreenManagers;
