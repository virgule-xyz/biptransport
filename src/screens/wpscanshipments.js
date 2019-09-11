/**
 * Copyright (c) Netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useEffect, useContext } from 'react';
import { Alert, View } from 'react-native';
import { Grid, Row, Col } from 'native-base';
import { CInfo, CSpace, CBarCodeReader, CWaypointTemplate, CSep, CButton } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from './index';
import { splashname } from '../../package.json';

/**
 * Multi scan bar codes of shipments to get
 */
const ScreenWaypointScanShipments = ({ navigation }) => {
  // manage the  context
  const appContext = useContext(AppContext);

  // display state for code bar
  const [showCodebarState, setShowCodebarState] = useState(false);

  // load a dev fake context
  useEffect(() => {
    appContext.doLoadFakeContext();
  }, []);

  // timeout of waiting timer
  let timeout = null;

  // the routine to show another code bar
  const routine = () => {
    if (showCodebarState === false && !timeout) {
      timeout = setTimeout(() => {
        setShowCodebarState(true);
      }, 1000);
    }
  };

  // stop the above routine
  const stopRoutine = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  // when codebar change to not shown run the routine above to show it again after 1 sec
  useEffect(() => {
    routine();
    return function cleanUp() {
      stopRoutine();
    };
  }, [showCodebarState]);

  // same as above but for the first screen display
  useEffect(() => {
    routine();
    return function cleanUp() {
      stopRoutine();
    };
  }, []);

  // Verify code it should be in array of waypoint codes
  const onVerificator = num => {
    return new Promise((resolve, reject) => {
      if (appContext.waypoint.shippingCodes[appContext.waypoint.shippingCodeIndex] === num) {
        setShowCodebarState(null);
        stopRoutine();
        appContext.setCurrentWaypointCode(num);
        resolve(num);
      } else {
        stopRoutine();
        setShowCodebarState(true);
        reject({ err: 1, message: 'Problème de code barre' });
      }
    });
  };

  // if ok and if another code to scan then show again the codebarreader or go to next step
  const onSuccess = () => {
    setShowCodebarState(null);
    if (appContext.isNeedAnotherShipmentCode()) {
      setTimeout(() => appContext.getNextShipmentCode(() => {}), 1000);
    } else {
      navigation.navigate(NAVS.wpscanshipments.next);
    }
  };

  const onError = msg => {
    // setShowCodebarState(null);
    if (msg) Alert.alert(splashname, msg);
    else Alert.alert(splashname, 'Une erreur est survenue avec ce colis.');
  };

  const onPressManager = () => {
    navigation.navigate(NAVS.managers.current);
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
                Scannez le code barre du colis
                {waypoint.shippingCodes.length > 1 &&
                  ` ${waypoint.shippingCodeIndex + 1}/${waypoint.shippingCodes.length}`}
                ...
              </CInfo>
            </View>
          }
        >
          <CSpace />
          {showCodebarState && (
            <CBarCodeReader
              testID="ID_BARCODE_SHIP"
              input
              verificator={onVerificator}
              onSuccess={onSuccess}
              onError={onError}
            />
          )}
          <CSpace />
          <Grid>
            <Row>
              <Col size={9}>
                <CButton onPress={onPressManager} block icon="bell" label="Responsable" />
              </Col>
            </Row>
          </Grid>
        </CWaypointTemplate>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointScanShipments;
