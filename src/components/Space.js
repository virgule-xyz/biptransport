import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

export const SPACE_HEIGHT = 20;

const CSpace = ({ n }) => (
  <View
    style={{
      width: '100%',
      height: n * SPACE_HEIGHT,
      flex: 1,
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
