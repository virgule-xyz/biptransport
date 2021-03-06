/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { View } from 'react-native';
import { DEFAULT_FONT_SIZE, COLORS, CText } from '@components';
import PropTypes from 'prop-types';

/**
 * Un cercle de couleur avec un chiffre dedans
 */
const CBadge = ({ color, front, children }) => {
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
      <CText style={{ color: front, fontSize: (DEFAULT_FONT_SIZE * 2) / 3, fontWeight: 'bold' }}>
        {children}
      </CText>
    </View>
  );
};

CBadge.propTypes = {
  color: PropTypes.string.isRequired,
};

export default CBadge;
