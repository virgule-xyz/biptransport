import { Animated, NativeModules, Platform, PixelRatio } from 'react-native';

jest.mock('NativeModules', () => {
  return {
    RNVectorIconsManager: {},
  };
});
