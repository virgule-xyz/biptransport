import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {
  ScreenSplash,
  ScreenDriver,
  ScreenCar,
  ScreenManagers,
  ScreenWaypointDashboard,
  ScreenWaypointBadCondition,
  ScreenWaypointResume,
  ScreenWaypointEnd,
  ScreenWaypointScanArrival,
  ScreenWaypointScanShipments,
  ScreenWaypointScanPickups,
  ScreenWaypointScanPickupsPhotos,
} from '@screens';

const WaypointStack = createStackNavigator(
  {
    ScreenWaypointDashboard,
    ScreenManagers,
    ScreenWaypointBadCondition,
    ScreenWaypointScanArrival,
    ScreenWaypointScanShipments,
    ScreenWaypointScanPickups,
    ScreenWaypointScanPickupsPhotos,
    ScreenWaypointResume,
    ScreenWaypointEnd,
  },
  {
    initialRouteName: 'ScreenWaypointDashboard',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  },
);

const StartSwitch = createSwitchNavigator(
  { ScreenSplash, WaypointStack, ScreenDriver, ScreenCar },
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
