import React from 'react';
import { CContent, CSpace, CTitle, CButton } from '@components';
import { version } from '../../package.json';

const ScreenSplash = () => {
  const onPressContinue = () => {
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
