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

import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: 'green',
  diffNameColor: 'darkturquoise',
});

/**
 * Just a wrapper around a Native Base button
 */
const CButton = ({ label, icon, small, style, ...props }) => {
  const buttonStyle = [
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
  ];
  const iconStyle = [
    small && {
      fontSize: 2.6 * DEFAULT_FONT_SIZE,
      marginLeft: 0,
    },
  ];
  const textStyle = [
    small && {
      flex: 0,
      width: '100%',
      fontSize: Math.max(9, 0.6 * DEFAULT_FONT_SIZE),
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
  const formatedLabel = small ? label.toUpperCase() : label;

  return (
    <Button iconLeft {...props} style={buttonStyle}>
      {icon && <Icon name={icon} type={ICON_TYPE} color={ICON_COLOR} style={iconStyle} />}
      {label && <Text style={textStyle}>{formatedLabel}</Text>}
    </Button>
  );
};

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

CButton.whyDidYouRender = true;

export default React.memo(CButton);
