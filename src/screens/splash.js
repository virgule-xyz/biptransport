import React, { useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { Grid, Row, Col } from 'native-base';
import { CContent, CSpace, CTitle, CButton, CText } from '@components';
import { Pool } from '@webservices';
import { NAVS } from '@screens';
import { splashname, version } from '../../package.json';
import { AppContext } from '@contexts';

/**
 * Splash screen with app title and version
 */
const ScreenSplash = ({ navigation }) => {
  // manage the driver context
  const appContext = useContext(AppContext);

  // test if it is needed to load the previous context
  const onPressContinue = async () => {
    appContext
      .isNeedDriverScan()
      .then(needScans => {
        if (needScans) navigation.navigate(NAVS.start.next);
        else {
          Alert.alert(
            splashname,
            'Reprendre votre tournée ?',
            [
              {
                text: 'Oui',
                onPress: async () => {
                  await appContext.doLoad();
                  navigation.navigate(NAVS.wpdashboard.current);
                },
              },
              {
                text: 'Non',
                onPress: async () => {
                  await appContext.doClear();
                  navigation.navigate(NAVS.start.next);
                },
              },
            ],
            { cancelable: false },
          );
        }
      })
      .catch(err => {
        navigation.navigate(NAVS.start.next);
      });
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

export default ScreenSplash;
