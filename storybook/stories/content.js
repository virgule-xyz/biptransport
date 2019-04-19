import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CButton, CContent } from '@components';

storiesOf('Content', module).add('CContent', () => (
  <CContent fullscreen>
    <CButton
      label="Rechercher"
      icon="arrow-left"
      onPress={() => {
        alert('on press');
      }}
    />
  </CContent>
));
