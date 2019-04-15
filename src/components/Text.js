/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from 'native-base';

const CText = ({ children, ...props }) => <Text {...props}>{children}</Text>;

export default CText;
