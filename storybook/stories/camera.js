import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CContent, CCamera } from '@components';

const onSuccess = value => {};

const onError = value => {};

const onTakePicture = picture => {};

storiesOf('Camera', module).add('Camera', () => (
  <CContent>
    <CCamera onTakePicture={onTakePicture} />
  </CContent>
));
