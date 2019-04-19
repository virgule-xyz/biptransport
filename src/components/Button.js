import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, Icon } from 'native-base';
import { ICON_TYPE, ICON_COLOR } from './Icon';

const CButton = ({ label, icon, ...props }) => (
  <Button iconLeft {...props}>
    {icon && <Icon name={icon} type={ICON_TYPE} color={ICON_COLOR} />}
    {label && <Text>{label}</Text>}
  </Button>
);

CButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
};

CButton.defaultProps = {
  label: 'My button',
  icon: null,
};

export default CButton;
