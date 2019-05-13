import React, { useState, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import {
  CButton,
  CContent,
  CTitle,
  CText,
  CSpace,
  CSep,
  COLORS,
  CSpinner,
  CWaypointButtons,
  CWaypointAddress,
  CWaypointCounters,
} from '@components';
import { AppContext } from '@contexts';
import ScreenWaypointCollection from './wpcollection';
import ScreenWaypointGalery from './wpgalery';

/**
 * L'écran affiche les données du point de passage ainsi que les boutons d'action liés
 */
const ScreenWaypointDashboard = () => {
  // Driver context to get tour id
  const appContext = useContext(AppContext);

  // Manage the Wapoint Collection modal
  const [showCollectionState, setShowCollectionState] = useState(false);

  // Manage the Wapoint Galery modal
  const [showGaleryState, setShowGaleryState] = useState(false);

  const onPressArrived = () => {};

  const onPressRescueButton = () => {};
  const onPressCallManagers = () => {};
  const onPressBackHome = () => {};
  const onPressTravel = () => {
    appContext.openMapScreen();
  };
  const onPressGalery = () => {
    setShowGaleryState(state => true);
  };
  const onPressBroken = () => {};
  const onPressOtherWaypoint = () => {
    setShowCollectionState(state => true);
  };
  const onCloseScreenWaypointCollection = () => {
    setShowCollectionState(state => false);
  };
  const onCloseScreenWaypointGalery = () => {
    setShowGaleryState(false);
  };
  const onSelectOtherWaypoint = id => {
    appContext.selectWaypointById(id);
    setShowCollectionState(state => false);
  };

  return (
    <AppContext.Consumer>
      {({ slip, driver, waypoint, waypointCollection, waypointList }) => (
        <>
          {!waypointCollection ||
            (waypointCollection.length < 0 && (
              <>
                <CSpace n={2} />
                <CSpinner />
              </>
            ))}
          {waypoint && waypointCollection && waypointCollection.length >= 0 && (
            <CContent
              stretch
              numero={slip.code}
              dateString={slip.date}
              name={`${driver.lastname} ${driver.firstname}`}
              pressRescueButton={onPressRescueButton}
              pressCallManagers={onPressCallManagers}
              pressBackHome={onPressBackHome}
            >
              <View style={{ flex: 1 }}>
                <CSpace />
                <CTitle testID="ID_WPDASHBOARD_TITLE">{`Point de passage ${waypoint.index + 1}/${
                  waypointCollection.length
                }`}</CTitle>
                <CSpace />
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    paddingVertical: '4%',
                    paddingHorizontal: '2%',
                    backgroundColor: COLORS.GREY,
                  }}
                >
                  <CWaypointAddress
                    testID="ID_WPDASHBOARD_ADDRESS"
                    name={waypoint.name}
                    address={waypoint.address}
                    all
                  />
                  <CSep />
                  <CWaypointCounters
                    testID="ID_WPDASHBOARD_COUNTERS"
                    shipping={waypoint.shippingCount}
                    pickup={waypoint.pickupCount}
                  />
                  <CSep />
                  <ScrollView style={{ flex: 1 }}>
                    <CText testID="ID_WPDASHBOARD_DESC">{waypoint.accessDescription}</CText>
                  </ScrollView>
                </View>
              </View>
              <View style={{ flex: 0 }}>
                <CSpace />
                <CWaypointButtons
                  testID="ID_WPDASHBOARD_BUTTONS"
                  pictureCard={waypoint.pictureCollection && waypoint.pictureCollection.length}
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
                name={waypoint.name}
                address={waypoint.address}
                onClose={onCloseScreenWaypointGalery}
              />
            </CContent>
          )}
        </>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointDashboard;
