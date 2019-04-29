import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

export const ICON_TYPE = 'EvilIcons';
export const ICON_COLOR = '#ffffff';

/**
 * Simple wrapper with only a name to give
 */
const CIcon = ({ name, ...props }) => (
  <Icon name={name} type={ICON_TYPE} color={ICON_COLOR} {...props} />
);

CIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CIcon;
