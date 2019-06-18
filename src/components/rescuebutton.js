/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { COLORS, RESCUE_PADDING, RESCUE_BUTTON_SIZE, CSpinner } from '@components';
import { AppContext } from '@contexts';
import PropTypes from 'prop-types';

/**
 * Un bouton avec une bouée pour appeler tous les managers
 */

const CRescueButton = ({ onPress }) => {
  // manage the context
  const appContext = useContext(AppContext);

  const memoizedRender = (
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
        position: 'relative',
      }}
    >
      {appContext.rescueIsSearching && (
        <CSpinner
          color="white"
          style={{
            width: RESCUE_BUTTON_SIZE,
            height: RESCUE_BUTTON_SIZE,
          }}
        />
      )}
      {!appContext.rescueIsSearching && (
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
      )}
    </TouchableOpacity>
  );

  return memoizedRender;
};

CRescueButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CRescueButton;
