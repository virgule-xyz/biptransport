/**
 * Copyright (c) bee2link, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { Grid, Row, Col } from 'native-base';
import {
  CInfo,
  CSpace,
  CBarCodeReader,
  CWaypointTemplate,
  CSep,
  CButton,
  CWaypointCounters,
} from '@components';
import { AppContext } from '@contexts';
// import PropTypes from 'prop-types';

/**
 * Expliquer ce qu'affiche et permet de faire l'écran
 */
const ScreenWaypointScanArrival = ({ navigation }) => {
  // manage the driver context
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.loadFakeContext();
  }, []);

  return (
    <AppContext.Consumer>
      {({ waypoint }) => (
        <CWaypointTemplate
          greyContent={
            <View>
              <CSep />
              <CInfo>Scannez le code barre 1/1 du point de passage...</CInfo>
            </View>
          }
        >
          <CSpace />
          <CBarCodeReader
            input={false}
            verificator={() => {}}
            onSuccess={() => {}}
            onError={() => {}}
            hide={() => {}}
          />
          <CSpace />
          <Grid>
            <Row>
              <Col size={9}>
                <CButton onPress={() => {}} block icon="bell" label="Responsable" />
              </Col>
              <Col size={1} />
              <Col size={9}>
                <CButton danger onPress={() => {}} block icon="close-o" label="Annuler" />
              </Col>
            </Row>
          </Grid>
        </CWaypointTemplate>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointScanArrival;
