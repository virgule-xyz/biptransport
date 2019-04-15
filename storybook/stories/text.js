import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CText, CTitle } from '@components';

storiesOf('Text', module)
  .add('CText', () => <CText> Hello Storybook </CText>)
  .add('CTitle', () => <CTitle> Hello Storybook </CTitle>);
