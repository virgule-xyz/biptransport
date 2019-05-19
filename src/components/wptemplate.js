/**
 * Copyright (c) bee2link, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { CContent, CTitle, CSpace, COLORS, CSpinner, CWaypointAddress } from '@components';
import { AppContext } from '@contexts';

/**
 * The shell of all the screen
 */
const CWaypointTemplate = ({ children, greyContent = null }) => {
  const onPressRescueButton = () => {};
  const onPressCallManagers = () => {};
  const onPressBackHome = () => {};

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
              <View style={{ flex: greyContent ? 1 : 0 }}>
                <CSpace />
                <CTitle testID="ID_WPDASHBOARD_TITLE">{`Point de passage ${waypoint.index + 1}/${
                  waypointCollection.length
                }`}</CTitle>
                <CSpace />
                <View
                  style={{
                    flex: greyContent ? 1 : 0,
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
                  {greyContent}
                </View>
              </View>

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

export default CWaypointTemplate;
