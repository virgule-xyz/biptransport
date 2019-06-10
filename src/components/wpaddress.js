/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { View } from 'react-native';
import { CText, COLORS, DEFAULT_FONT_SIZE } from '@components';
import PropTypes from 'prop-types';

/**
 * Affiche un double bloc sur l'adresse et le nom du labo/point de passage
 */
const CWaypointAddress = ({ small, name, address, ...props }) => {
  return (
    <View testID={props.testID} style={{ flex: 0 }}>
      <CText
        uppercase
        style={{
          color: COLORS.BLACK,
          textAlign: 'center',
          fontSize: DEFAULT_FONT_SIZE * 1,
          fontWeight: 'bold',
          marginBottom: !small && '2%',
        }}
        numberOfLines={small ? 2 : 9}
        ellipsisMode="tail"
      >
        {name}
      </CText>
      {small && (
        <CText
          style={{
            color: COLORS.BLACK,
            textAlign: 'center',
            fontSize: DEFAULT_FONT_SIZE * 1,
            fontWeight: 'bold',
            marginBottom: '2%',
          }}
        >
          ...
        </CText>
      )}
      <CText
        uppercase
        style={{
          color: COLORS.BLACK,
          textAlign: 'center',
          fontSize: DEFAULT_FONT_SIZE * 0.8,
        }}
        numberOfLines={1}
        ellipsisMode="tail"
      >
        {address}
      </CText>
    </View>
  );
};

CWaypointAddress.propTypes = {
  small: PropTypes.bool,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

CWaypointAddress.defaultProps = {
  small: false,
};

export default CWaypointAddress;
