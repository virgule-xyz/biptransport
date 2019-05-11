export { default as ScreenSplash } from './splash';
export { default as ScreenDriver } from './driver';
export { default as ScreenCar } from './car';
export { default as ScreenManagers } from './managers';
export { default as ScreenWaypointDashboard } from './wpdashboard';
export { default as ScreenWaypointCollection } from './wpcollection';
export { default as ScreenWaypointGalery } from './wpgalery';

export const NAVS = {
  start: { next: 'WaypointStack' },
  driver: { previous: 'ScreenSplash', next: 'ScreenCar' },
  car: { previous: 'ScreenDriver', next: 'ScreenWaypointDashboard' },
  wpdashboard: { previous: 'ScreenCar' },
};
