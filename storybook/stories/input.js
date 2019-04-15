import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CInput } from '@components';

storiesOf('Inputs', module).add('CInput', () => (
  <CInput
    label="Label"
    onChange={v => {
      console.warn(v);
    }}
  />
));
