import React from 'react';
import { View, Animated } from 'react-native';

class Swipeable extends React.Component {
  render() {
    return <Animated.View>{this.props.children}</Animated.View>;
  }
}
export default Swipeable;
