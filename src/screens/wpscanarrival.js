/**
 * Copyright (c) Netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useEffect, useContext } from 'react';
import { Alert, View } from 'react-native';
import { Grid, Row, Col } from 'native-base';
import { CInfo, CSpace, CBarCodeReader, CWaypointTemplate, CButton } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from './index';
import { splashname } from '../../package.json';

/**
 * Multi scan bar codes of waypoint
 */
const ScreenWaypointScanArrival = ({ navigation }) => {
  // manage the driver context
  const appContext = useContext(AppContext);

  const [hideArrivalBarCodeReaderState, setHideArrivalBarCodeReaderState] = useState(false);

  useEffect(() => {
    appContext.loadFakeContext();
  }, []);

  // Verify code it should be in array of waypoint codes
  const onVerificator = num => {
    return new Promise((resolve, reject) => {
      setHideArrivalBarCodeReaderState(true);
      if (appContext.waypoint.waypointCodes[appContext.waypoint.waypointCodeIndex] === num) {
        resolve(num);
      } else {
        reject({ err: '', message: '' });
      }
    });
  };

  // if ok and if another code to scan then show again the codebarreader or go to next step
  const onSuccess = () => {
    if (appContext.needAnotherWaypointCode()) {
      setTimeout(
        () => appContext.nextWaypointCode(() => setHideArrivalBarCodeReaderState(false)),
        1000,
      );
    } else {
      setHideArrivalBarCodeReaderState(false);
      if (appContext.waypoint.shippingCount > 0) navigation.navigate(NAVS.wpscanshipments.current);
      else navigation.navigate(NAVS.wpscanpickups.current);
    }
  };

  const onError = (value, cb) => {
    Alert.alert(
      splashname,
      'Le code ne correspond pas au point...',
      [
        {
          text: 'Fermer',
          style: 'cancel',
          onPress: () => {
            setHideArrivalBarCodeReaderState(false);
            cb && cb();
          },
        },
      ],
      { cancelable: false },
    );
  };

  const onPressManager = () => {
    navigation.navigate(NAVS.wpcannotscanarrival.current);
    // setHideArrivalBarCodeReaderState(true);
  };

  const onPressCancel = () => {
    navigation.navigate(NAVS.wpscanarrival.previous);
  };

  return (
    <AppContext.Consumer>
      {({ waypoint }) => (
        <CWaypointTemplate
          small
          noAddress
          greyContent={
            <View>
              <CInfo>
                Scannez le code barre{` `}
                {waypoint.waypointCodes.length > 1 &&
                  `${waypoint.waypointCodeIndex + 1}/${waypoint.waypointCodes.length} `}
                du point de passage...
              </CInfo>
            </View>
          }
        >
          <CSpace />
          <CBarCodeReader
            testID="ID_BARCODE_WP"
            input
            verificator={onVerificator}
            onSuccess={onSuccess}
            onError={onError}
            hide={hideArrivalBarCodeReaderState}
          />
          <CSpace />
          <Grid>
            <Row>
              <Col size={9} style={{ justifyContent: 'flex-end' }}>
                <CButton onPress={onPressManager} block icon="bell" label="Responsable" />
              </Col>
              <Col size={1} />
              <Col size={9} style={{ justifyContent: 'flex-end' }}>
                <CButton danger onPress={onPressCancel} block icon="close-o" label="Annuler" />
              </Col>
            </Row>
          </Grid>
        </CWaypointTemplate>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointScanArrival;
