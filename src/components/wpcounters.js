import React from 'react';
import { View } from 'react-native';
import { CText, CBadge, COLORS } from '@components';
import PropTypes from 'prop-types';

/**
 * Affiche une ligne avec les compteurs d'objectifs de livraison et de dépôt
 */
const CWaypointCounters = ({
  shipping,
  pickup,
  colorShip = COLORS.RED,
  colorPick = COLORS.RED,
  ...props
}) => {
  return (
    <View
      testID={props.testID}
      style={{
        flex: 0,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '5%',
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '40%',
        }}
      >
        <CText>Livraisons</CText>
        <CBadge color={colorShip}>{shipping}</CBadge>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '40%',
        }}
      >
        <CText>Enlèvements</CText>
        <CBadge color={colorPick}>{pickup}</CBadge>
      </View>
    </View>
  );
};

CWaypointCounters.propTypes = {
  shipping: PropTypes.string.isRequired,
  pickup: PropTypes.string.isRequired,
  colorShip: PropTypes.string.isRequired,
  colorPick: PropTypes.string.isRequired,
};

// CWaypointCounters.defaultProps = {
//   colorShip: '',
//   colorPick: '',
// };

export default CWaypointCounters;
