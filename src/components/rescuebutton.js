/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useEffect, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { COLORS, DEFAULT_FONT_SIZE } from '@components';
import PropTypes from 'prop-types';

/**
 * Un bouton avec une bouée pour appeler tous les managers
 */
let RESCUE_PADDING;
let RESCUE_BUTTON_SIZE;

const CRescueButton = ({ onPress }) => {
  useEffect(() => {
    console.warn('USE_EFFECT');
    RESCUE_PADDING = DEFAULT_FONT_SIZE / 5;
    RESCUE_BUTTON_SIZE = Math.ceil(DEFAULT_FONT_SIZE * 2.3);
  }, []);

  const memoizedRender = useMemo(() => {
    console.warn('USE_MEMO');
    return (
      (RESCUE_BUTTON_SIZE && (
        <TouchableOpacity
          testID="ID_BUTTON_SOS"
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
      )) || <></>
    );
  }, [RESCUE_BUTTON_SIZE]);

  return memoizedRender;
};

CRescueButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default CRescueButton;
