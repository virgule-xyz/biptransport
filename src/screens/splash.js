import React from 'react';
import { CContent, CSpace, CTitle, CButton } from '@components';
import { version } from '../../package.json';

const ScreenSplash = () => {
  const onPressContinue = () => {
    alert('continue');
  };

  return (
    <CContent fullscreen center>
      <CSpace />
      <CTitle>Application BIP-LIV {version}</CTitle>
      <CSpace />
      <CButton block label="Continuer" />
      <CSpace />
    </CContent>
  );
};

export default ScreenSplash;
