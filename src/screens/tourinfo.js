/**
 * Copyright (c) Netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Grid, Row, Col } from 'native-base';
import { CContent, CText, CSpace, CButton } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from './index';

/**
 * Expliquer ce qu'affiche et permet de faire l'écran
 */
const ScreenTourInfo = ({ navigation }) => {
  // Driver context to get tour id
  const appContext = useContext(AppContext);

  const onPressBackHome = useCallback(() => {
    appContext.setHideCarBarCodeReader(false);
    navigation.navigate(NAVS.driver.previous);
  }, []);

  const onPressContinue = useCallback(() => {
    navigation.navigate(NAVS.tourinfo.next);
  }, []);

  return (
    <AppContext.Consumer>
      {({ slip, shippingCard, waypointCard }) => (
        <CContent title="Aperçu de la tournée" fullscreen pressBackHome={onPressBackHome}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}
          >
            <CSpace />
            <CText>{`Tournée ${slip.code} du ${slip.date}`}</CText>
            <CSpace />
            <CText>{`Faire ${shippingCard} livraison(s) sur ${waypointCard} points de passages`}</CText>
            <CSpace />
            <CButton label="Continuer" block onPress={onPressContinue} />
          </View>
        </CContent>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenTourInfo;
