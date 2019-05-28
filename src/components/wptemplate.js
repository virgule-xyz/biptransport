/**
 * Copyright (c) bee2link, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useContext } from 'react';
import { View, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { CContent, CTitle, CSpace, COLORS, CSpinner, CWaypointAddress } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from '@screens';
import { splashname } from '../../package';

/**
 * The shell of all the screen
 */
const CWaypointTemplate = ({ children, navigation, greyContent = null }) => {
  // manage the context
  const appContext = useContext(AppContext);

  const onAcceptContactManagers = () => {
    appContext
      .contactAllManagers()
      .then(() => {
        Alert.alert("Un message vient d'être envoyé à vos responsables");
      })
      .catch(err => {
        Alert.alert(`Une erreur s'est produite : ${err}`);
      });
  };

  const onPressRescueButton = () => {
    Alert.alert(
      splashname,
      'Voulez-vous envoyer une alerte à vos responsables ?',
      [
        { text: 'Oui', onPress: onAcceptContactManagers },
        {
          text: 'Non',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };
  const onPressCallManagers = () => {
    navigation.navigate(NAVS.managers.current);
  };
  const onPressBackHome = () => {
    navigation.navigate(NAVS.wpdashboard.current);
  };

  return (
    <AppContext.Consumer>
      {({ slip, driver, waypoint, waypointCollection }) => (
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
              {greyContent && (
                <View
                  style={{
                    overflow: 'hidden',
                  }}
                >
                  <CTitle testID="ID_WPDASHBOARD_TITLE">{`Point de passage ${waypoint.index + 1}/${
                    waypointCollection.length
                  }`}</CTitle>
                  <View
                    style={{
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
                    <View>{greyContent}</View>
                  </View>
                </View>
              )}
              {!greyContent && (
                <View
                  style={{
                    overflow: 'hidden',
                  }}
                >
                  <CTitle testID="ID_WPDASHBOARD_TITLE">{`Point de passage ${waypoint.index + 1}/${
                    waypointCollection.length
                  }`}</CTitle>
                  <View
                    style={{
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
                  </View>
                </View>
              )}
              {children}
            </CContent>
          )}
        </>
      )}
    </AppContext.Consumer>
  );
};

CWaypointTemplate.propTypes = {
  greyContent: PropTypes.element,
};

CWaypointTemplate.defaultProps = {
  greyContent: null,
};

export default withNavigation(CWaypointTemplate);
