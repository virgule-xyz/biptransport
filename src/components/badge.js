import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { DEFAULT_FONT_SIZE, COLORS, CText } from '@components';

/**
 * Un cercle de couleur avec un chiffre dedans
 */
const CBadge = ({ color, children }) => {
  return (
    <View
      style={{
        flex: 0,
        width: 2 * DEFAULT_FONT_SIZE,
        height: 2 * DEFAULT_FONT_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        borderRadius: 100,
        marginHorizontal: '2%',
      }}
    >
      <CText
        style={{ color: COLORS.WHITE, fontSize: (DEFAULT_FONT_SIZE * 2) / 3, fontWeight: 'bold' }}
      >
        {children}
      </CText>
    </View>
  );
};

CBadge.propTypes = {
  color: PropTypes.string.isRequired,
};

export default CBadge;
