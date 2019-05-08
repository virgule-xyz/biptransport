import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ScreenSplash from '@screens/splash';
import ScreenDriver from '@screens/driver';
import ScreenCar from '@screens/car';
import ScreenManagers from '@screens/managers';
import ScreenWaypointDashboard from '@screens/wpdashboard';
import ScreenWaypointCollection from '@screens/wpcollection';
import {
  CarContextProvider,
  DriverContextProvider,
  ManagersContextProvider,
  WaypointContextProvider,
} from '@contexts';

storiesOf('Screens', module)
  .add('Splash', () => <ScreenSplash />)
  .add('Driver', () => (
    <DriverContextProvider>
      <ScreenDriver />
    </DriverContextProvider>
  ))
  .add('Car', () => (
    <CarContextProvider>
      <ScreenCar />
    </CarContextProvider>
  ))
  .add('Managers', () => (
    <ManagersContextProvider>
      <ScreenManagers />
    </ManagersContextProvider>
  ))
  .add('Waypoint Dashboard', () => (
    <WaypointContextProvider>
      <ScreenWaypointDashboard />
    </WaypointContextProvider>
  ))
  .add('Waypoint Collection', () => (
    <WaypointContextProvider>
      <ScreenWaypointCollection
        show
        datas={[
          { id: 1, key: 1, name: 'Name #1', city: 'City #1', ord: 'Ord #1' },
          {
            id: 2,
            key: 2,
            name: 'Name #2',
            city:
              'Quo consequatur unde. Dolor sunt facilis. Sequi praesentium quas. Consequatur quos sunt. Aut vitae velit. Dolore non explicabo perspiciatis.',
            ord: 'Ord #2',
          },
          { id: 3, key: 3, name: 'Name #1', city: 'City #1', ord: 'Ord #1' },
          {
            id: 4,
            key: 4,
            name: 'Name #2',
            city: 'Eos et eligendi',
            ord: 'Ord #2',
          },
          { id: 5, key: 5, name: 'Name #1', city: 'City #1', ord: 'Ord #1' },
          {
            id: 6,
            key: 6,
            name: 'Name #2',
            city:
              'Quo consequatur unde. Dolor sunt facilis. Sequi praesentium quas. Consequatur quos sunt. Aut vitae velit. Dolore non explicabo perspiciatis.',
            ord: 'Ord #2',
          },
        ]}
        onClose={() => {}}
        onSelectWaypoint={id => {
          console.warn(id);
        }}
      />
    </WaypointContextProvider>
  ));
