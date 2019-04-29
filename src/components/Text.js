import React from 'react';
import { Text } from 'native-base';

/**
 * Wrapper around Natie Base text
 */
const CText = ({ children, ...props }) => <Text {...props}>{children}</Text>;

export default CText;
