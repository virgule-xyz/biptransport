/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { View, Dimensions } from 'react-native';
import { CButton, COLORS, DEFAULT_FONT_SIZE } from '@components';
import PropTypes from 'prop-types';

/**
 * Un bouton carré avec une icone
 */
const CSquareButton = ({
  label = '',
  icon = null,
  color = COLORS.WHITE,
  size = DEFAULT_FONT_SIZE * 0.66,
  ...props
}) => (
  <CButton
    small
    icon={icon}
    label={label}
    style={{ width: size, height: size, backgroundColor: color }}
    {...props}
  />
);

CSquareButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

/**
 * Quatre boutons pour les actions du point de passage
 */
const CWaypointButtons = ({
  pictureCard,
  onPressTravel,
  onPressGalery,
  onPressBroken,
  onPressArrived,
  ...props
}) => {
  const { width } = Dimensions.get('window');
  const NUMBER_OF_BUTTONS = 4;
  const BUTTON_WIDTH = (width / NUMBER_OF_BUTTONS) * 0.8;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} testID={props.testID}>
      <CSquareButton
        testID={`${props.testID}_LOCATION`}
        label="J'y vais"
        icon="location"
        color={COLORS.JYVAIS}
        size={BUTTON_WIDTH}
        onPress={onPressTravel}
      />
      <CSquareButton
        testID={`${props.testID}_PICTURES`}
        label={`${pictureCard}`}
        icon="image"
        color={COLORS.PHOTOS}
        size={BUTTON_WIDTH}
        onPress={onPressGalery}
        disabled={pictureCard === 0}
      />
      <CSquareButton
        testID={`${props.testID}_AIE`}
        label="Arrêté"
        icon="close-o"
        color={COLORS.AIE}
        size={BUTTON_WIDTH}
        onPress={onPressBroken}
      />
      <CSquareButton
        testID={`${props.testID}_ARRIVED`}
        label="Arrivé !"
        icon="check"
        color={COLORS.ARRIVE}
        size={BUTTON_WIDTH}
        onPress={onPressArrived}
      />
    </View>
  );
};

CWaypointButtons.propTypes = {
  pictureCard: PropTypes.number.isRequired,
  onPressTravel: PropTypes.func.isRequired,
  onPressGalery: PropTypes.func.isRequired,
  onPressBroken: PropTypes.func.isRequired,
  onPressArrived: PropTypes.func.isRequired,
};

export default CWaypointButtons;
