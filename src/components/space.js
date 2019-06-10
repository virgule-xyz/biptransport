/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { View, Text } from 'react-native';
import { SPACE_HEIGHT } from '@components';
import PropTypes from 'prop-types';

/**
 * Add a space bewtween components by 'n' SPACE_HEIGHT
 */
const CSpace = ({ n, flex }) => (
  <View
    style={{
      width: '100%',
      height: n * SPACE_HEIGHT,
      flex: flex ? 1 : 0,
      overflow: 'hidden',
      clear: 'both',
    }}
  >
    <Text> </Text>
  </View>
);

CSpace.propTypes = {
  n: PropTypes.number,
  flex: PropTypes.bool,
};

CSpace.defaultProps = {
  n: 1,
  flex: false,
};

export default CSpace;
