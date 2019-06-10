import React from 'react';
import { AppContextProvider } from '@contexts';
import { View, StatusBar } from 'react-native';
import AppNavigator from './navigator';

const App = () => (
  <AppContextProvider>
    <View testID="SafeAreaView" style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar hidden />
      <AppNavigator />
    </View>
  </AppContextProvider>
);

export default App;
