import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CContent, CBarCodeReader } from '@components';

// console.disableYellowBox = true;

const verificator = barcodes => {
  return new Promise((resolve, reject) => {
    resolve(barcodes);
  });
};

const onSuccess = value => {};

const onError = value => {};

storiesOf('BarCode', module).add('CBarCodeScanner', () => (
  <CContent>
    <CBarCodeReader verificator={verificator} onSuccess={onSuccess} onError={onError} />
  </CContent>
));
