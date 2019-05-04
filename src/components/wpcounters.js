import React from 'react';
import { View } from 'react-native';
import { CText, CBadge, COLORS } from '@components';
import PropTypes from 'prop-types';

/**
 * Affiche une ligne avec les compteurs d'objectifs de livraison et de dépôt
 */
const CWaypointCounters = ({ shipping, pickup }) => {
  return (
    <View
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
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '40%',
          height: '100%',
        }}
      >
        <CText>Livraisons</CText>
        <CBadge color={COLORS.RED}>{shipping}</CBadge>
      </View>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '40%',
          height: '100%',
        }}
      >
        <CText>Enlèvements</CText>
        <CBadge color={COLORS.RED}>{pickup}</CBadge>
      </View>
    </View>
  );
};

CWaypointCounters.propTypes = {
  shipping: PropTypes.string.isRequired,
  pickup: PropTypes.string.isRequired,
};

export default CWaypointCounters;
