import React from 'react';
import { CSpace, CContent, CButton, CSpinner } from '@components';
import { ManagersContext } from '@contexts';

/**
 * Le header et une liste de boutons permettant de joindre un manager
 */
const ScreenManagers = () => {
  const onPressManager = manager => {
    console.warn('Do something on manager', manager);
  };

  return (
    <CContent title="Vos responsables" fullscreen>
      <ManagersContext.Consumer>
        {({ managers }) => (
          <>
            {managers.length > 0 &&
              managers.map(manager => (
                <>
                  <CButton
                    light
                    full
                    label={manager.name}
                    onPress={() => onPressManager(manager)}
                  />
                  <CSpace n={0.1} />
                </>
              ))}
            {managers.length === 0 && (
              <>
                <CSpace n={2} />
                <CSpinner />
              </>
            )}
          </>
        )}
      </ManagersContext.Consumer>
    </CContent>
  );
};

export default ScreenManagers;
