import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {
  ScreenSplash,
  ScreenDriver,
  ScreenCar,
  ScreenManagers,
  ScreenWaypointDashboard,
  ScreenWaypointBadCondition,
  ScreenWaypointResume,
  ScreenWaypointScanArrival,
  ScreenWaypointScanShipments,
} from '@screens';

const WaypointStack = createStackNavigator(
  {
    ScreenWaypointDashboard,
    ScreenDriver,
    ScreenCar,
    ScreenManagers,
    ScreenWaypointBadCondition,
    ScreenWaypointResume,
    ScreenWaypointScanArrival,
    ScreenWaypointScanShipments,
  },
  {
    initialRouteName: 'ScreenDriver',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  },
);

const StartSwitch = createSwitchNavigator(
  { ScreenSplash, WaypointStack },
  {
    initialRouteName: 'ScreenSplash',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  },
);

const AppNavigator = createAppContainer(StartSwitch);

export default AppNavigator;
