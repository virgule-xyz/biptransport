import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CIcon } from '@components';

storiesOf('Icon', module)
  .add('CIcon', () => <CIcon name="paperclip" />)
  .add('CIcon Arrow', () => <CIcon name="arrow-left" />)
  .add('CIcon Reverse', () => (
    <CIcon
      reverse
      name="arrow-left"
      onPress={() => {
        alert('ok');
      }}
    />
  ));
