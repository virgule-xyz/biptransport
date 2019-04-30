import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CContent, CSpinner, CSpace } from '@components';

storiesOf('Spinner', module).add('CSpinner', () => (
  <CContent>
    <CSpinner />
  </CContent>
));
