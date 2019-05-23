import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { CIcon, CText, COLORS } from '@components';

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
      paddingVertical: 3,
      paddingHorizontal: 7,
      marginVertical: 3,
    }}
  >
    <CIcon name="info" />
    <CText style={{ color: COLORS.BLACK, marginLeft: 10 }}>{children}</CText>
  </View>
);

export default CInfo;
