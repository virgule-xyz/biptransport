import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ScreenSplash from '@screens/splash';
import ScreenDriver from '@screens/driver';
import ScreenCar from '@screens/car';
import { CarContextProvider, DriverContextProvider } from '@contexts';

storiesOf('Screens', module)
  .add('Splash', () => <ScreenSplash />)
  .add('Driver', () => (
    <DriverContextProvider>
      <ScreenDriver />
    </DriverContextProvider>
  ))
  .add('Car', () => (
    <CarContextProvider>
      <ScreenCar />
    </CarContextProvider>
  ));
