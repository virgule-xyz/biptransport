import React from 'react';
import { CText, COLORS, DEFAULT_FONT_SIZE } from '@components';
import PropTypes from 'prop-types';

/**
 * Affiche un double bloc sur l'adresse et le nom du labo/point de passage
 */
const CWaypointAddress = ({ name, address }) => {
  return (
    <>
      <CText
        uppercase
        style={{
          color: COLORS.BLACK,
          textAlign: 'center',
          fontSize: DEFAULT_FONT_SIZE * 1,
          fontWeight: 'bold',
          marginBottom: '2%',
        }}
      >
        {name}
      </CText>
      <CText
        uppercase
        style={{
          color: COLORS.BLACK,
          textAlign: 'center',
          fontSize: DEFAULT_FONT_SIZE * 0.8,
        }}
      >
        {address}
      </CText>
    </>
  );
};

CWaypointAddress.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default CWaypointAddress;
