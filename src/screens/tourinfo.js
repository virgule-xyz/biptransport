/**
 * Copyright (c) Netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View } from 'react-native';
import { CContent, CText, CSpace, CButton } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from './index';

/**
 * Expliquer ce qu'affiche et permet de faire l'écran
 */
const ScreenTourInfo = ({ navigation }) => {
  // Driver context to get tour id
  const appContext = useContext(AppContext);

  const [shippingTotal, setShippingTotal] = useState(0);
  const [pickupTotal, setPickupTotal] = useState(0);

  useEffect(() => {
    appContext.doLoadFakeContext();
    const { waypointCollection } = appContext;
    setPickupTotal(
      waypointCollection.reduce((prev, cur, ind) => {
        return prev + 1 * cur.nbr_enl;
      }, 0),
    );
    setShippingTotal(
      waypointCollection.reduce((prev, cur, ind) => {
        return prev + 1 * cur.nbr_liv;
      }, 0),
    );
  }, []);

  const onPressBackHome = useCallback(() => {
    appContext.setHideCarBarCodeReader(false);
    navigation.navigate(NAVS.driver.previous);
  }, []);

  const onPressContinue = useCallback(() => {
    navigation.navigate(NAVS.tourinfo.next);
  }, []);

  return (
    <AppContext.Consumer>
      {({ slip, waypointCollection }) => (
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
            <CText>{`Faire ${pickupTotal} enlèvement(s) et ${shippingTotal} livraison(s) sur ${
              waypointCollection.length
            } points de passages`}</CText>
            <CSpace />
            <CButton block label="Continuer" onPress={onPressContinue} />
          </View>
        </CContent>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenTourInfo;
