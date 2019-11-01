import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CContent, CCamera } from '@components';

const onSuccess = value => {};

const onError = value => {};

const onTakePicture = picture => {
  console.log(picture);
};

const onRecord = data => {
  console.warn('RETOUR', data);
};

storiesOf('Camera', module).add('Camera', () => (
  <CContent>
    <CCamera onTakePicture={onTakePicture} onRecord={onRecord} />
  </CContent>
));
