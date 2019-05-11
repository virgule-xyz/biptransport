import React from 'react';
import { View, StatusBar } from 'react-native';
import AppNavigator from './navigator';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.navigator = null;
  }

  render() {
    return (
      <View testID="SafeAreaView" style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar hidden />
        <AppNavigator />
      </View>
    );
  }
}

export default App;
