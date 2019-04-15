/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Item, Input, Label } from 'native-base';

const CInput = ({ label, onChange }) => (
  <Item floatingLabel>
    <Label>{label}</Label>
    <Input onChangeText={onChange} />
  </Item>
);

CInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CInput;
