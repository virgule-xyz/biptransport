import React, { useContext } from 'react';
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
import { WaypointContext } from '@contexts';

/**
 * L'écran affiche les données du point de passage ainsi que les boutons d'action liés
 */
const ScreenWaypointDashboard = () => {
  // Waypoint contexts to exploits
  const waypointContext = useContext(WaypointContext);

  // FIXME: all the datas should come from the context even the driver's one. Test to include the drvier and car context in the waypoint context
  const onPressArrived = () => {};

  const onPressRescueButton = () => {};
  const onPressCallManagers = () => {};
  const onPressBackHome = () => {};
  const onPressTravel = () => {
    waypointContext.openMapScreen();
  };
  const onPressGalery = () => {};
  const onPressBroken = () => {};
  const onPressOtherWaypoint = () => {};

  return (
    <WaypointContext.Consumer>
      {({
        waypointIndex,
        waypointCard,
        waypointName,
        waypointAddress,
        waypointShippingCount,
        waypointPickupCount,
        waypointAccessDescription,
        waypointId,
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
              numero="T-04"
              dateString="03/09/2019"
              name="Pierre"
              pressRescueButton={onPressRescueButton}
              pressCallManagers={onPressCallManagers}
              pressBackHome={onPressBackHome}
            >
              <View style={{ flex: 1 }}>
                <CSpace />
                <CTitle>{`Point de passage ${waypointIndex}/${waypointCard}`}</CTitle>
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
                  <CWaypointAddress name={waypointName} address={waypointAddress} all />
                  <CSep />
                  <CWaypointCounters
                    shipping={waypointShippingCount}
                    pickup={waypointPickupCount}
                  />
                  <CSep />
                  <ScrollView style={{ flex: 1 }}>
                    <CText>{waypointAccessDescription}</CText>
                  </ScrollView>
                </View>
              </View>
              <View style={{ flex: 0 }}>
                <CSpace />
                <CWaypointButtons
                  onPressTravel={onPressTravel}
                  onPressGalery={onPressGalery}
                  onPressBroken={onPressBroken}
                  onPressArrived={onPressArrived}
                />
                <CSpace />
                <CButton
                  danger
                  block
                  label="Choisir un autre point de passage"
                  onPress={onPressOtherWaypoint}
                />
              </View>
            </CContent>
          )}
        </>
      )}
    </WaypointContext.Consumer>
  );
};

export default ScreenWaypointDashboard;
