import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { CIcon } from '@components';

const CError = ({ children }) => (
  <View
    style={{
      backgroundColor: '#FF3311',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: '#ffffff',
      paddingVertical: 3,
      paddingHorizontal: 7,
      marginVertical: 3,
    }}
  >
    <CIcon name="error" />
    <Text style={{ color: '#ffffff', marginLeft: 10 }}>{children}</Text>
  </View>
);

export default CError;
