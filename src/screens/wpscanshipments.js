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

  useEffect(() => {
    appContext.doLoadFakeContext();
  }, []);

  // Verify code it should be in array of waypoint codes
  const onVerificator = num => {
    return new Promise((resolve, reject) => {
      if (appContext.waypoint.shippingCodes[appContext.waypoint.shippingCodeIndex] === num) {
        appContext.setCurrentWaypointCode(num);
        resolve(num);
      } else {
        reject({ err: '', message: '' });
      }
    });
  };

  // if ok and if another code to scan then show again the codebarreader or go to next step
  const onSuccess = () => {
    if (appContext.isNeedAnotherShipmentCode()) {
      setTimeout(() => appContext.getNextShipmentCode(() => {}), 1000);
    } else {
      navigation.navigate(NAVS.wpscanshipments.next);
    }
  };

  const onError = msg => {
    if (msg) Alert.alert(splashname, msg);
    else Alert.alert(splashname, 'Ce colis est à livrer chez un autre client..');
  };

  const onPressManager = () => {
    navigation.navigate(NAVS.managers.current);
  };

  // const onPressCancel = () => {
  //   navigation.navigate(NAVS.wpscanarrival.previous);
  // };

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
          <CBarCodeReader
            testID="ID_BARCODE_SHIP"
            input
            verificator={onVerificator}
            onSuccess={onSuccess}
            onError={onError}
          />
          <CSpace />
          <Grid>
            <Row>
              <Col size={9}>
                <CButton onPress={onPressManager} block icon="bell" label="Responsable" />
              </Col>
              {/* <Col size={1} />
              <Col size={9}>
                <CButton danger onPress={onPressCancel} block icon="close-o" label="Annuler" />
              </Col> */}
            </Row>
          </Grid>
        </CWaypointTemplate>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointScanShipments;
