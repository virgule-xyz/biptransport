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
import { NAVS } from './index';

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
    appContext.endWaypoint();
    if (appContext.needToVisitAnotherWaypoint()) {
      appContext.selectNextWaypoint(() => {
        navigation.navigate(NAVS.wpdashboard.current);
      });
    } else {
      appContext.endTour(() => {
        navigation.navigate(NAVS.wpdashboard.next);
      });
    }
  };

  return (
    <AppContext.Consumer>
      {({ waypoint }) => (
        <CWaypointTemplate
          greyContent={
            <View>
              <CSep />
              <CText style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Ce qu'il fallait faire :
              </CText>
              <CSpace n={0.5} />
              <CWaypointCounters
                testID="ID_WPDASHBOARD_COUNTERS"
                shipping={waypoint.shippingCount}
                pickup={waypoint.pickupCount}
              />
              <CSpace />
              <CText style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Résumé de votre passage :
              </CText>
              <CSpace n={0.5} />

              <CWaypointCounters
                results
                shipping={waypoint.shippingCodeIndex}
                pickup={waypoint.pickupRealCount}
                colorShip={ColorsByNumber(
                  Math.abs(waypoint.shippingCount - waypoint.shippingCodeIndex),
                )}
                colorPick={ColorsByNumber(
                  Math.abs(waypoint.pickupCount - waypoint.pickupRealCount),
                )}
              />
            </View>
          }
        >
          <View style={{ flex: 1 }}>
            <CTextInput label="Laissez un commentaire concernant ce passage :" />
          </View>
          <CButton
            testID="ID_NEXT_WAYPOINT_BUTTON"
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
