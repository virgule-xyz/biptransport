/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import {
  CModal,
  CSpace,
  CSep,
  CTitle,
  CWaypointOtherPassage,
  WaypointOtherPassageShape,
} from '@components';
/**
 * List all waypoints of the driver, should be displayed as a modal
 */
const ScreenWaypointCollection = ({ show, datas, onClose, onSelectWaypoint }) => {
  return (
    <CModal testID="ID_WPCOLLECTION" onClose={onClose} show={show}>
      <CTitle>Autres points de passage...</CTitle>
      <CSep />
      <CSpace />
      <FlatList
        testID="ID_WPCOLLECTION_LIST"
        data={datas}
        renderItem={({ item }) => (
          <CWaypointOtherPassage
            testID="ID_WPCOLLECTION_LIST_ITEM"
            wp={{ ...item, onPress: onSelectWaypoint }}
          />
        )}
      />
    </CModal>
  );
};

ScreenWaypointCollection.propTypes = {
  show: PropTypes.bool.isRequired,
  datas: PropTypes.arrayOf(WaypointOtherPassageShape).isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectWaypoint: PropTypes.func.isRequired,
};

export default ScreenWaypointCollection;
