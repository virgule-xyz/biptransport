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
  colorShip = COLORS.PRIMARY,
  colorPick = COLORS.PRIMARY,
  frontColorShip = COLORS.PRIMARY,
  frontColorPick = COLORS.PRIMARY,
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
        <CBadge color={colorShip} front={frontColorShip}>
          {shipping}
        </CBadge>
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
        <CBadge color={colorPick} front={frontColorPick}>
          {pickup}
        </CBadge>
      </View>
    </View>
  );
};

CWaypointCounters.propTypes = {
  shipping: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  pickup: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  colorShip: PropTypes.string.isRequired,
  colorPick: PropTypes.string.isRequired,
  frontColorShip: PropTypes.string,
  frontColorPick: PropTypes.string,
};

CWaypointCounters.defaultProps = {
  frontColorShip: '#fff',
  frontColorPick: '#fff',
};

export default CWaypointCounters;
