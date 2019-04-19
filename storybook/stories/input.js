import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CInput } from '@components';

storiesOf('Inputs', module)
  .add('CInput default', () => (
    <CInput
      label="Label"
      onChange={v => {
        console.warn(v);
      }}
    />
  ))
  .add('CInput success', () => (
    <CInput
      label="Label"
      success
      onChange={v => {
        console.warn(v);
      }}
    />
  ))
  .add('CInput error', () => (
    <CInput
      label="Label"
      error
      onChange={v => {
        console.warn(v);
      }}
    />
  ))
  .add('CInput iconName', () => (
    <CInput
      label="Label"
      iconName="home"
      onChange={v => {
        console.warn(v);
      }}
    />
  ));
