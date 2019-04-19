import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ScreenSplash from '@screens/splash';
import ScreenDriver from '@screens/driver';

storiesOf('Screens', module)
  .add('Splash', () => <ScreenSplash />)
  .add('Driver', () => <ScreenDriver />);
