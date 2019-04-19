/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Item, Input, Label, Icon } from 'native-base';

const CInput = ({ label, success, error, iconName, onChange }) => {
  let anIcon = null;
  if (success) {
    anIcon = <Icon name="checkmark-circle" />;
  } else if (error) {
    anIcon = <Icon name="close-circle" />;
  } else if (iconName) {
    anIcon = <Icon active name={iconName} />;
  }

  return (
    <Item floatingLabel error={error} success={success}>
      <Label>{label}</Label>
      <Input onChangeText={onChange} />
      {anIcon}
    </Item>
  );
};

CInput.propTypes = {
  label: PropTypes.string.isRequired,
  success: PropTypes.bool,
  iconName: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

CInput.defaultProps = {
  success: false,
  error: false,
  iconName: null,
};

export default CInput;
