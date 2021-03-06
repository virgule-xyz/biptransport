/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { View } from 'react-native';
import { CIcon, CText, COLORS, DEFAULT_FONT_SIZE } from '@components';

/**
 * A wrapper for error display in red
 */
const CInfo = ({ children }) => (
  <View
    style={{
      backgroundColor: COLORS.YELLOW,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: COLORS.BLACK,
      paddingVertical: DEFAULT_FONT_SIZE / 5,
      paddingHorizontal: DEFAULT_FONT_SIZE / 2,
      marginVertical: DEFAULT_FONT_SIZE / 5,
    }}
  >
    <CIcon name="info" />
    <CText style={{ color: COLORS.BLACK, marginLeft: DEFAULT_FONT_SIZE }}>{children}</CText>
  </View>
);

export default CInfo;
