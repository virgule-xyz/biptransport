/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { View } from 'react-native';
import { COLORS } from '@components';

/**
 * Just a greey box container
 */
const CGreyBox = ({ children, style }) => {
  return (
    <View
      style={[
        {
          flex: 1,
          width: '100%',
          paddingVertical: '4%',
          paddingHorizontal: '2%',
          backgroundColor: COLORS.GREY,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default CGreyBox;
