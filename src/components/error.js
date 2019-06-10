/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { CIcon, COLORS, DEFAULT_FONT_SIZE } from '@components';

/**
 * A wrapper for error display in red
 */
const CError = ({ children }) => (
  <View
    style={{
      backgroundColor: COLORS.DANGER,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: '#ffffff',
      paddingVertical: DEFAULT_FONT_SIZE / 5,
      paddingHorizontal: DEFAULT_FONT_SIZE / 2,
      marginVertical: DEFAULT_FONT_SIZE / 5,
    }}
  >
    <CIcon name="error" />
    <Text style={{ color: COLORS.WHITE, marginLeft: DEFAULT_FONT_SIZE }}>{children}</Text>
  </View>
);

export default CError;
