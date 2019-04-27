/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { getStorybookUI, configure } from '@storybook/react-native';
import './storybook/rn-addons';
import App from './src/App';
import { story, version, name as appName } from './package.json';

console.warn(`** ${appName} version ${version}`);

let TheApp = null;
if (story) {
  configure(() => {
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
