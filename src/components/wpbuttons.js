import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import { CButton, COLORS } from '@components';

/**
 * Un bouton carré avec une icone
 */
const CSquareButton = ({ label = '', icon = null, color = '#fff', size = 10, onPress }) => (
  <CButton
    small
    onPress={onPress}
    icon={icon}
    label={label}
    style={{ width: size, height: size, backgroundColor: color }}
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
const CWaypointButtons = ({ onPressTravel, onPressGalery, onPressBroken, onPressArrived }) => {
  const { width } = Dimensions.get('window');
  const buttonWidth = (width / 4) * 0.8;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <CSquareButton
        label="J'y vais"
        icon="location"
        color={COLORS.JYVAIS}
        size={buttonWidth}
        onPress={onPressTravel}
      />
      <CSquareButton
        label="Photos"
        icon="image"
        color={COLORS.PHOTOS}
        size={buttonWidth}
        onPress={onPressGalery}
      />
      <CSquareButton
        label="Aïe"
        icon="close-o"
        color={COLORS.AIE}
        size={buttonWidth}
        onPress={onPressBroken}
      />
      <CSquareButton
        label="Arrivé !"
        icon="check"
        color={COLORS.ARRIVE}
        size={buttonWidth}
        onPress={onPressArrived}
      />
    </View>
  );
};

CWaypointButtons.propTypes = {
  onPressTravel: PropTypes.func.isRequired,
  onPressGalery: PropTypes.func.isRequired,
  onPressBroken: PropTypes.func.isRequired,
  onPressArrived: PropTypes.func.isRequired,
};

export default CWaypointButtons;
