/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { Icon } from 'react-native-elements';
import { ICON_TYPE, ICON_COLOR } from '@components';
import PropTypes from 'prop-types';

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
