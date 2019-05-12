import React from 'react';
import { withNavigation } from 'react-navigation';
import { CContent, CSpace, CTitle, CButton } from '@components';
import { NAVS } from '@screens';
import { splashname, version } from '../../package.json';

/**
 * Splash screen with app title and version
 */
const ScreenSplash = ({ navigation }) => {
  const onPressContinue = () => {
    navigation.navigate(NAVS.start.next);
  };

  // Do nothing
  const onPressBackHome = () => {};

  const title = `${splashname}\n${version}`;

  return (
    <CContent fullscreen center pressBackHome={onPressBackHome}>
      <CSpace />
      <CTitle testID="ID_TITLE">{title}</CTitle>
      <CSpace />
      <CButton testID="ID_CONTINUE" block label="Continuer" onPress={onPressContinue} />
      <CSpace />
    </CContent>
  );
};

export default withNavigation(ScreenSplash);
