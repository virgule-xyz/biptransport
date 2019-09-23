import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {
  ScreenSplash,
  ScreenDriver,
  ScreenVideosDownload,
  ScreenCar,
  ScreenManagers,
  ScreenWaypointDashboard,
  ScreenWaypointBadCondition,
  ScreenWaypointResume,
  ScreenWaypointEnd,
  ScreenWaypointScanArrival,
  ScreenWaypointCannotScanArrival,
  ScreenWaypointContactManager,
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
    ScreenWaypointContactManager,
    ScreenWaypointCannotScanArrival,
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
  { ScreenSplash, WaypointStack, ScreenDriver, ScreenCar, ScreenVideosDownload },
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
