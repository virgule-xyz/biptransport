/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { Button, Text, Icon } from 'native-base';
import { ICON_TYPE, ICON_COLOR, DEFAULT_FONT_SIZE } from '@components';
import PropTypes from 'prop-types';

/**
 * Just a wrapper around a Native Base button
 */
const CButton = ({ label, icon, small, style, ...props }) => (
  <Button
    iconLeft
    {...props}
    style={[
      style,
      small && {
        flex: 0,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      },
      props.disabled && {
        opacity: 0.5,
        backgroundColor: '#e0e0e0',
      },
    ]}
  >
    {icon && (
      <Icon
        name={icon}
        type={ICON_TYPE}
        color={ICON_COLOR}
        style={[
          small && {
            fontSize: 2.6 * DEFAULT_FONT_SIZE,
            marginLeft: 0,
          },
        ]}
      />
    )}
    {label && (
      <Text
        style={[
          small && {
            flex: 0,
            width: '100%',
            fontSize: Math.max(9, 0.6 * DEFAULT_FONT_SIZE),
            fontWeight: 'bold',
            textAlign: 'center',
          },
        ]}
      >
        {small ? label.toUpperCase() : label}
      </Text>
    )}
  </Button>
);

CButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  small: PropTypes.bool,
};

CButton.defaultProps = {
  label: 'My button',
  icon: null,
  small: false,
};

export default CButton;
