import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const BASE_HEIGHT = 20;

const CSpace = ({ n }) => <View style={{ height: n * BASE_HEIGHT, flex: 1 }} />;

CSpace.propTypes = {
  n: PropTypes.number,
};

CSpace.defaultProps = {
  n: 1,
};

export default CSpace;
