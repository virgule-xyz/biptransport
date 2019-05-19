import React from 'react';
import { View } from 'react-native';
import { CSpace, CContent, CButton, CSpinner } from '@components';
import { AppContext } from '@contexts';

/**
 * Le header et une liste de boutons permettant de joindre un manager
 */
const ScreenManagers = () => {
  const onPressManager = manager => {
    // FIXME: do domehting with it
  };

  const onPressBackHome = () => {
    // FIXME: goto to home
    // FIXME: make a global function
  };

  // FIXME: Add a waiting on CContent to display proper waiting spinner and a prop for the condition to fullfil

  return (
    <CContent title="Vos responsables" fullscreen pressBackHome={onPressBackHome}>
      <AppContext.Consumer>
        {({ managers }) => (
          <>
            {managers.length > 0 &&
              managers.map((manager, index) => (
                <View key={`${manager.name}${index}`}>
                  <CButton
                    light
                    full
                    label={manager.name}
                    onPress={() => onPressManager(manager)}
                  />
                  <CSpace n={0.1} />
                </View>
              ))}
            {managers.length === 0 && (
              <>
                <CSpace n={2} />
                <CSpinner />
              </>
            )}
          </>
        )}
      </AppContext.Consumer>
    </CContent>
  );
};

export default ScreenManagers;
