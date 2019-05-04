import React from 'react';
import { Alert } from 'react-native';
import { CContent, CSpace, CTitle, CButton } from '@components';
import { splashname, version } from '../../package.json';

/**
 * Splash screen with app title and version
 */
const ScreenSplash = () => {
  // FIXME: navigate to the driver screen
  const onPressContinue = () => {
    Alert.alert('continue');
  };

  // Do nothing
  const onPressBackHome = () => {};

  const title = `${splashname}\n${version}`;

  return (
    <CContent fullscreen center pressBackHome={onPressBackHome}>
      <CSpace />
      <CTitle>{title}</CTitle>
      <CSpace />
      <CButton block label="Continuer" onPress={onPressContinue} />
      <CSpace />
    </CContent>
  );
};

export default ScreenSplash;
