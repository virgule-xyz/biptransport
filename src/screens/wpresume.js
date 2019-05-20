/**
 * Copyright (c) bee2link, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import {
  CWaypointTemplate,
  CSep,
  CWaypointCounters,
  CText,
  CTextInput,
  CSpace,
  CButton,
  ColorsByNumber,
} from '@components';
import { AppContext } from '@contexts';

/**
 * Expliquer ce qu'affiche et permet de faire l'écran
 */
const ScreenWaypointResume = ({ navigation }) => {
  // Driver context to get tour id
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.loadFakeContext();
  }, []);

  const onPressNextWaypoint = () => {
    navigation.navigate('');
  };

  return (
    <AppContext.Consumer>
      {({ waypoint }) => (
        <CWaypointTemplate
          greyContent={
            <View>
              <CSep />
              <CWaypointCounters
                testID="ID_WPDASHBOARD_COUNTERS"
                shipping={waypoint.shippingCount}
                pickup={waypoint.pickupCount}
              />
              <CSpace />
              <CText style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Résumé de votre passage :
              </CText>
              <CWaypointCounters
                results
                shipping={1}
                pickup={1}
                colorShip={ColorsByNumber(waypoint.shippingCount - 1)}
                colorPick={ColorsByNumber(-1)}
              />
              <CSpace />
            </View>
          }
        >
          <View style={{ flex: 1 }}>
            <CTextInput label="Laissez un commentaire concernant ce passage :" />
          </View>
          <CButton
            onPress={onPressNextWaypoint}
            block
            icon="arrow-right"
            label="Prochain point de passage"
          />
        </CWaypointTemplate>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointResume;
