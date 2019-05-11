import React from 'react';
import { View, StatusBar } from 'react-native';
import AppNavigator from './navigator';
import { CarContextProvider, DriverContextProvider } from '@contexts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.navigator = null;
  }

  render() {
    return (
      <DriverContextProvider>
        <CarContextProvider>
          <View testID="SafeAreaView" style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar hidden />
            <AppNavigator />
          </View>
        </CarContextProvider>
      </DriverContextProvider>
    );
  }
}

export default App;
