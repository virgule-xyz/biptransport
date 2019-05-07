import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  CarContextProvider,
  DriverContextProvider,
  ManagersContextProvider,
  WaypointContextProvider,
} from '@contexts';
import { ScreenWaypointDashboard } from '@screens';

console.disableYellowBox = true;

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <WaypointContextProvider>
        <ScreenWaypointDashboard />
      </WaypointContextProvider>
    );
  }
}
