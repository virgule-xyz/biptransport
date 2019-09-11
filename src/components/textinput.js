/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { View } from 'react-native';
import { DEFAULT_FONT_SIZE } from '@components';
import { Textarea, Label } from 'native-base';
import PropTypes from 'prop-types';

import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: 'green',
  diffNameColor: 'darkturquoise',
});

/**
 * Wrap a Native Base input with a label for multiline text.
 * Provide the onChange to get the text entered
 * Flag success or error to display corresponding state
 */
const CTextInput = ({ label, onChange, ...props }) => {
  return (
    <View style={{ padding: DEFAULT_FONT_SIZE }}>
      <Label>{label}</Label>
      <Textarea rowSpan={5} bordered onChangeText={onChange} testID={props.testID} />
    </View>
  );
};
CTextInput.whyDidYouRender = true;

CTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(CTextInput);
