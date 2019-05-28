export { default as ScreenCar } from './car';
export { default as ScreenDriver } from './driver';
export { default as ScreenManagers } from './managers';
export { default as ScreenSplash } from './splash';
export { default as ScreenWaypointBadCondition } from './wpbadcondition';
export { default as ScreenWaypointCollection } from './wpcollection';
export { default as ScreenWaypointDashboard } from './wpdashboard';
export { default as ScreenWaypointScanArrival } from './wpscanarrival';
export { default as ScreenWaypointGalery } from './wpgalery';
export { default as ScreenWaypointResume } from './wpresume';

export const NAVS = {
  start: { current: 'ScreenSplash', next: 'WaypointStack' },
  driver: { current: 'ScreenDriver', previous: 'ScreenSplash', next: 'ScreenCar' },
  car: { current: 'ScreenCar', previous: 'ScreenDriver', next: 'ScreenWaypointDashboard' },
  managers: { current: 'ScreenManagers' },
  wpdashboard: { current: 'ScreenWaypointDashboard', previous: 'ScreenCar' },
  wpbadcondition: { current: 'ScreenWaypointBadCondition', next: 'ScreenWaypointResume' },
  wpscanarrival: {
    current: 'ScreenWaypointScanArrival',
    previous: 'ScreenWaypointDashboard',
    next: 'ScreenWaypointResume',
  },
  wpresume: { current: 'ScreenWaypointResume', next: 'ScreenEnd' },
};
