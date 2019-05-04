import React from 'react';
import { View } from 'react-native';
import { COLORS } from '@components';

/**
 * Un séparateur, une ligne entre des blocs
 */
const CSep = () => {
  return (
    <View
      style={{
        flex: 0,
        width: '96%',
        marginVertical: '3%',
        marginHorizontal: '2%',
        height: 3,
        backgroundColor: COLORS.SEP,
        borderBottomColor: COLORS.WHITE,
        borderBottomWidth: 2,
        opacity: 0.5,
      }}
    />
  );
};

export default CSep;
