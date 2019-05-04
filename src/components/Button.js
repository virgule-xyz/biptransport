import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, Icon } from 'native-base';
import { ICON_TYPE, ICON_COLOR } from './icon';

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
    ]}
  >
    {icon && (
      <Icon
        name={icon}
        type={ICON_TYPE}
        color={ICON_COLOR}
        style={[
          small && {
            fontSize: 40,
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
            fontSize: 9,
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
