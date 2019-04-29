import React from 'react';
import { CContent, CSpace, CTitle, CButton } from '@components';
import { version } from '../../package.json';

/**
 * Splash screen with app title and version
 */
const ScreenSplash = () => {
  const onPressContinue = () => {
    // FIXME: navigate to the driver screen
    // eslint-disable-next-line no-undef
    alert('continue');
  };

  const title = `Application BIP-LIV ${version}`;

  return (
    <CContent fullscreen center>
      <CSpace />
      <CTitle>{title}</CTitle>
      <CSpace />
      <CButton block label="Continuer" onPress={onPressContinue} />
      <CSpace />
    </CContent>
  );
};

export default ScreenSplash;
