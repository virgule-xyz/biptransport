import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import { CButton, COLORS } from '@components';

/**
 * Un bouton carré avec une icone
 */
const CSquareButton = ({ label = '', icon = null, color = '#fff', size = 10, ...props }) => (
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
  const buttonWidth = (width / 4) * 0.8;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} testID={props.testID}>
      <CSquareButton
        testID={`${props.testID}_LOCATION`}
        label="J'y vais"
        icon="location"
        color={COLORS.JYVAIS}
        size={buttonWidth}
        onPress={onPressTravel}
      />
      <CSquareButton
        testID={`${props.testID}_PICTURES`}
        label={`${pictureCard}`}
        icon="image"
        color={COLORS.PHOTOS}
        size={buttonWidth}
        onPress={onPressGalery}
        disabled={pictureCard === 0}
      />
      <CSquareButton
        testID={`${props.testID}_AIE`}
        label="Aïe"
        icon="close-o"
        color={COLORS.AIE}
        size={buttonWidth}
        onPress={onPressBroken}
      />
      <CSquareButton
        testID={`${props.testID}_ARRIVED`}
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
  pictureCard: PropTypes.number.isRequired,
  onPressTravel: PropTypes.func.isRequired,
  onPressGalery: PropTypes.func.isRequired,
  onPressBroken: PropTypes.func.isRequired,
  onPressArrived: PropTypes.func.isRequired,
};

export default CWaypointButtons;
