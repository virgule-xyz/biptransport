/**
 * Copyright (c) bee2link, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React /* , { useState, useEffect } */ from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { COLORS, DEFAULT_FONT_SIZE } from '@components';

/**
 * Un bouton avec une bouée pour appeler tous les managers
 */
const CRescueButton = ({ onPress }) => {
  const RESCUE_PADDING = 4;
  const RESCUE_BUTTON_SIZE = DEFAULT_FONT_SIZE * 2.3;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLORS.DANGER,
        paddingHorizontal: RESCUE_PADDING,
        paddingVertical: RESCUE_PADDING,
        paddingTop: RESCUE_PADDING - 1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: RESCUE_BUTTON_SIZE + RESCUE_PADDING * 2,
        height: RESCUE_BUTTON_SIZE + RESCUE_PADDING * 2,
        overflow: 'hidden',
        flex: 0,
      }}
    >
      <Icon
        name="lifebuoy"
        type="Entypo"
        style={{
          width: RESCUE_BUTTON_SIZE,
          height: RESCUE_BUTTON_SIZE,
          fontSize: RESCUE_BUTTON_SIZE,
          fontWeight: 'bold',
          color: COLORS.WHITE,
          overflow: 'hidden',
        }}
      />
    </TouchableOpacity>
  );
};

CRescueButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default CRescueButton;
