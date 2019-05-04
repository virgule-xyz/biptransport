import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

export const SPACE_HEIGHT = 20;

/**
 * Add a space bewtween components by 'n' SPACE_HEIGHT
 */
const CSpace = ({ n, flex = false }) => (
  <View
    style={{
      width: '100%',
      height: n * SPACE_HEIGHT,
      flex: flex ? 1 : 0,
    }}
  >
    <Text> </Text>
  </View>
);

CSpace.propTypes = {
  n: PropTypes.number,
};

CSpace.defaultProps = {
  n: 1,
};

export default CSpace;
