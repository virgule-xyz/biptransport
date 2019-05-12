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
import { WaypointContext, DriverContext } from '@contexts';
import ScreenWaypointCollection from './wpcollection';
import ScreenWaypointGalery from './wpgalery';

/**
 * L'écran affiche les données du point de passage ainsi que les boutons d'action liés
 */
const ScreenWaypointDashboard = () => {
  // Waypoint contexts to exploits
  const waypointContext = useContext(WaypointContext);

  // Manage the Wapoint Collection modal
  const [showCollectionState, setShowCollectionState] = useState(false);

  // Manage the Wapoint Galery modal
  const [showGaleryState, setShowGaleryState] = useState(false);

  // FIXME: all the datas should come from the context even the driver's one. Test to include the drvier and car context in the waypoint context
  const onPressArrived = () => {};

  const onPressRescueButton = () => {};
  const onPressCallManagers = () => {};
  const onPressBackHome = () => {};
  const onPressTravel = () => {
    waypointContext.openMapScreen();
  };
  const onPressGalery = () => {
    setShowGaleryState(true);
  };
  const onPressBroken = () => {};
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
    waypointContext.selectWaypointById(id);
    setShowCollectionState(false);
  };

  return (
    <DriverContext.Consumer>
      {({ slip, driver }) => (
        <WaypointContext.Consumer>
          {({
            waypointIndex,
            waypointCard,
            waypointName,
            waypointAddress,
            waypointShippingCount,
            waypointPickupCount,
            waypointAccessDescription,
            waypointListState,
            waypointPictureCollection,
          }) => (
            <>
              {waypointIndex < 0 && (
                <>
                  <CSpace n={2} />
                  <CSpinner />
                </>
              )}
              {waypointIndex >= 0 && (
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
                    <CTitle testID="ID_WPDASHBOARD_TITLE">{`Point de passage ${waypointIndex +
                      1}/${waypointCard}`}</CTitle>
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
                        name={waypointName}
                        address={waypointAddress}
                        all
                      />
                      <CSep />
                      <CWaypointCounters
                        testID="ID_WPDASHBOARD_COUNTERS"
                        shipping={waypointShippingCount}
                        pickup={waypointPickupCount}
                      />
                      <CSep />
                      <ScrollView style={{ flex: 1 }}>
                        <CText testID="ID_WPDASHBOARD_DESC">{waypointAccessDescription}</CText>
                      </ScrollView>
                    </View>
                  </View>
                  <View style={{ flex: 0 }}>
                    <CSpace />
                    <CWaypointButtons
                      testID="ID_WPDASHBOARD_BUTTONS"
                      pictureCard={waypointPictureCollection.length}
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
                </CContent>
              )}
              <ScreenWaypointCollection
                show={showCollectionState}
                datas={waypointListState}
                onClose={onCloseScreenWaypointCollection}
                onSelectWaypoint={onSelectOtherWaypoint}
              />
              <ScreenWaypointGalery
                show={showGaleryState}
                datas={waypointPictureCollection}
                name={waypointName}
                address={waypointAddress}
                onClose={onCloseScreenWaypointGalery}
              />
            </>
          )}
        </WaypointContext.Consumer>
      )}
    </DriverContext.Consumer>
  );
};

export default ScreenWaypointDashboard;
