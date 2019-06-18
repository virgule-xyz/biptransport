/**
 * Copyright (c) bee2link, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useEffect, useContext, useState } from 'react';
import { View, Alert } from 'react-native';
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

  const [commentState, setCommentState] = useState('');

  const onChangeComment = text => {
    setCommentState(text);
  };

  useEffect(() => {
    appContext.loadFakeContext();
  }, []);

  const onPressNextWaypoint = () => {
    appContext
      .endWaypoint(commentState)
      .then(() => {
        if (appContext.needToVisitAnotherWaypoint()) {
          appContext.selectNextWaypoint(() => {
            navigation.navigate(NAVS.wpdashboard.current);
          });
        } else {
          appContext.endTour(() => {
            navigation.navigate(NAVS.wpdashboard.next);
          });
        }
      })
      .catch(err => {
        console.warn('ERR', err);
      });
  };

  return (
    <AppContext.Consumer>
      {({ waypoint }) =>
        waypoint && (
          <CWaypointTemplate
            small
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
                  shipping={waypoint.shippingRealCodes.length}
                  pickup={waypoint.pickupRealCount || 0}
                  colorShip={ColorsByNumber(
                    Math.abs(waypoint.shippingCount - waypoint.shippingRealCodes.length),
                  )}
                  colorPick={ColorsByNumber(
                    Math.abs(waypoint.pickupCount - waypoint.pickupRealCount),
                  )}
                />
              </View>
            }
          >
            <View style={{ flex: 1 }}>
              <CTextInput
                testID="ID_MAKE_COMMENT"
                onChange={onChangeComment}
                label="Laissez un commentaire concernant ce passage :"
              />
            </View>
            <CButton
              testID="ID_NEXT_WAYPOINT_BUTTON"
              onPress={onPressNextWaypoint}
              block
              icon="arrow-right"
              label="Prochain point de passage"
            />
          </CWaypointTemplate>
        )
      }
    </AppContext.Consumer>
  );
};

export default ScreenWaypointResume;
