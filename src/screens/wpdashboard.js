/**
 * Copyright (c) Netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import {
  CButton,
  CText,
  CSpace,
  CSep,
  CWaypointButtons,
  CWaypointCounters,
  CWaypointTemplate,
} from '@components';
import { AppContext } from '@contexts';
import ScreenWaypointCollection from './wpcollection';
import ScreenWaypointGalery from './wpgalery';
import { NAVS } from './index';

/**
 * L'écran affiche les données du point de passage ainsi que les boutons d'action liés
 */
const ScreenWaypointDashboard = ({ navigation }) => {
  // Driver context to get tour id
  const appContext = useContext(AppContext);

  // the videos of the wp
  const [wpVideos, setWpVideos] = useState([]);

  // Manage the Wapoint Collection modal
  const [showCollectionState, setShowCollectionState] = useState(false);

  // Manage the Wapoint Galery modal
  const [showGaleryState, setShowGaleryState] = useState(false);

  const onPressArrived = () => {
    navigation.navigate(NAVS.wpscanarrival.current);
  };
  const onPressTravel = () => {
    appContext.doOpenMapScreen();
  };
  const onPressGalery = () => {
    setShowGaleryState(true);
  };
  const onPressBroken = () => {
    navigation.navigate(NAVS.wpbadcondition.current);
  };
  const onPressOtherWaypoint = () => {
    setShowCollectionState(true);
  };
  const onCloseScreenWaypointCollection = () => {
    setShowCollectionState(false);
  };
  const onCloseScreenWaypointGalery = () => {
    setShowGaleryState(false);
  };
  const onSelectOtherWaypoint = id => {
    appContext.setWaypointById(id);
    setShowCollectionState(false);
  };

  useEffect(() => {
    const runIt = async ctx => {
      try {
        ctx.doLoadFakeContext();
        ctx.doStartNewWaypoint().then(() => {
          ctx.doSave();
          setWpVideos(ctx.videosCache.filter(vid => vid.wp === ctx.waypoint.id));
        });
      } catch (e) {
        console.log(e);
      }
    };
    runIt(appContext);
  }, [appContext.waypointCollection, appContext.waypoint.id]);

  return (
    <AppContext.Consumer>
      {({ waypoint, waypointList }) => {
        return (
          <CWaypointTemplate
            greyContent={
              <View>
                <CSep />
                <CText style={{ textAlign: 'center', fontWeight: 'bold' }}>A faire ici :</CText>
                <CSpace n={0.5} />
                <CWaypointCounters
                  testID="ID_WPDASHBOARD_COUNTERS"
                  shipping={waypoint.shippingCount}
                  pickup={waypoint.pickupCount}
                />
              </View>
            }
          >
            <View style={{ flex: 1 }}>
              <CSpace />
              <ScrollView>
                <CText testID="ID_WPDASHBOARD_DESC">{waypoint.accessDescription}</CText>
                <CSpace n={2} />
              </ScrollView>
              <CSpace />
              <CWaypointButtons
                testID="ID_WPDASHBOARD_BUTTONS"
                pictureCard={waypoint.pictureCollection.length + waypoint.videos.length}
                onPressTravel={onPressTravel}
                onPressGalery={onPressGalery}
                onPressBroken={onPressBroken}
                onPressArrived={onPressArrived}
              />
              <CSpace />
              <CButton
                danger
                block
                testID="ID_WPDASHBOARD_OTHERWP"
                label="Choisir un autre point de passage"
                onPress={onPressOtherWaypoint}
              />
            </View>
            <ScreenWaypointCollection
              show={!!showCollectionState}
              datas={waypointList}
              onClose={onCloseScreenWaypointCollection}
              onSelectWaypoint={onSelectOtherWaypoint}
            />
            <ScreenWaypointGalery
              show={!!showGaleryState}
              datas={waypoint.pictureCollection}
              videos={wpVideos}
              name={waypoint.name}
              address={waypoint.address}
              onClose={onCloseScreenWaypointGalery}
            />
          </CWaypointTemplate>
        );
      }}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointDashboard;
