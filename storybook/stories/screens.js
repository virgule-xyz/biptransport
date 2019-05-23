import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react-native';
import ScreenSplash from '@screens/splash';
import ScreenDriver from '@screens/driver';
import ScreenCar from '@screens/car';
// import ScreenManagers from '@screens/managers';
import ScreenWaypointDashboard from '@screens/wpdashboard';
import ScreenWaypointCollection from '@screens/wpcollection';
import ScreenWaypointGalery from '@screens/wpgalery';
import ScreenWaypointBadCondition from '@screens/wpbadcondition';
import ScreenWaypointResume from '@screens/wpresume';
import ScreenWaypointScanArrival from '@screens/wpscanarrival';
import { AppContextProvider } from '@contexts';

const ModalScreenWaypointCollection = () => {
  const [showState, setShowState] = useState(true);
  return (
    <ScreenWaypointCollection
      show={showState}
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
      onClose={() => {
        setShowState(false);
      }}
      onSelectWaypoint={id => {
        console.warn(id);
        setShowState(false);
      }}
    />
  );
};

const ModalScreenWaypointGalery = () => {
  const [showState, setShowState] = useState(true);
  const [dataCollectionState, setDataCollectionState] = useState(() => {
    const read = require('../../src/webservices/commands.json');
    console.warn('READ', read);
    return read;
  });
  const [pictureCollectionState, setPictureCollectionState] = useState([]);

  useEffect(() => {
    if (dataCollectionState && dataCollectionState.commandes) {
      setPictureCollectionState(
        dataCollectionState.commandes.filter(item => item.id === '129042')[0].pnt_pj,
      );
    }
  }, [dataCollectionState]);

  return (
    <ScreenWaypointGalery
      show={showState}
      datas={pictureCollectionState}
      onClose={() => {
        setShowState(false);
      }}
    />
  );
};

storiesOf('Screens', module)
  .add('Splash', () => <ScreenSplash />)
  .add('Driver', () => (
    <AppContextProvider>
      <ScreenDriver />
    </AppContextProvider>
  ))
  .add('Car', () => (
    <AppContextProvider>
      <ScreenCar />
    </AppContextProvider>
  ))
  // .add('Managers', () => (
  //   <AppContextProvider>
  //     <ScreenManagers />
  //   </AppContextProvider>
  // ))
  .add('Waypoint Dashboard', () => (
    <AppContextProvider>
      <ScreenWaypointDashboard />
    </AppContextProvider>
  ))
  .add('Waypoint Collection', () => (
    <AppContextProvider>
      <ModalScreenWaypointCollection />
    </AppContextProvider>
  ))
  .add('Waypoint Galery', () => (
    <AppContextProvider>
      <ModalScreenWaypointGalery />
    </AppContextProvider>
  ))
  .add('Waypoint Conditions', () => (
    <AppContextProvider>
      <ScreenWaypointBadCondition />
    </AppContextProvider>
  ))
  .add('Waypoint End And Resume', () => (
    <AppContextProvider>
      <ScreenWaypointResume />
    </AppContextProvider>
  ))
  .add('Waypoint Scan arrival', () => (
    <AppContextProvider>
      <ScreenWaypointScanArrival />
    </AppContextProvider>
  ));
