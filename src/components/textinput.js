import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Textarea, Label } from 'native-base';
import { DEFAULT_FONT_SIZE } from '@components';

/**
 * Wrap a Native Base input with a label for multiline text.
 * Provide the onChange to get the text entered
 * Flag success or error to display corresponding state
 */
const CTextInput = ({ label, onChange }) => {
  return (
    <View style={{ padding: DEFAULT_FONT_SIZE }}>
      <Label>{label}</Label>
      <Textarea rowSpan={5} bordered onChangeText={onChange} />
    </View>
  );
};

CTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CTextInput;
