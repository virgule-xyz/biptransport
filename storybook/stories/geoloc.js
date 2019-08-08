import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react-native';
import { CText } from '@components';

import GetLocation from 'react-native-get-location';

const Location = () => {
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.warn(location);
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  return <CText>Géoloc</CText>;
};

storiesOf('Geoloc', module).add('Default', () => <Location />);
