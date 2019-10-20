/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { getStorybookUI, configure } from '@storybook/react-native';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import './storybook/rn-addons';
import App from './src/app';
import { story, version, env, name as appName, noyellow } from './package.json';

whyDidYouRender(React);

// eslint-disable-next-line import/no-mutable-exports
let TheApp = null;

if (noyellow) console.disableYellowBox = true;

if (story) {
  configure(() => {
    // eslint-disable-next-line global-require
    require('./storybook/stories');
  }, module);
  const StorybookUI = getStorybookUI({});

  const StorybookStack = createStackNavigator(
    {
      StorybookUI,
    },
    {
      initialRouteName: 'StorybookUI',
      headerMode: 'none',
      navigationOptions: {
        header: null,
      },
    },
  );
  TheApp = createAppContainer(StorybookStack);
} else {
  TheApp = App;
}

AppRegistry.registerComponent(appName, () => TheApp);

export default TheApp;
