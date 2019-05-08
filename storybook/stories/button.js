import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CButton } from '@components';

// console.disableYellowBox = true;

storiesOf('Button', module).add('CButton', () => (
  <>
    <CButton />
    <CButton
      label="Rechercher"
      icon="arrow-left"
      onPress={() => {
        alert('on press');
      }}
    />
  </>
));
