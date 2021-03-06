export { default as ScreenCar } from './car';
export { default as ScreenDeliveryScans } from './deliveryscans';
export { default as ScreenDriver } from './driver';
export { default as ScreenManagers } from './managers';
export { default as ScreenSplash } from './splash';
export { default as ScreenTourInfo } from './tourinfo';
export { default as ScreenVideosDownload } from './videosdwn';
export { default as ScreenWaypointBadCondition } from './wpbadcondition';
export { default as ScreenWaypointCannotScanArrival } from './wpcannotscanarrival';
export { default as ScreenWaypointCollection } from './wpcollection';
export { default as ScreenWaypointContactManager } from './wpcontactmanager';
export { default as ScreenWaypointDashboard } from './wpdashboard';
export { default as ScreenWaypointEnd } from './wpend';
export { default as ScreenWaypointGalery } from './wpgalery';
export { default as ScreenWaypointResume } from './wpresume';
export { default as ScreenWaypointScanArrival } from './wpscanarrival';
export { default as ScreenWaypointScanPickups } from './wpscanpickups';
export { default as ScreenWaypointScanPickupsPhotos } from './wpscanpickupsphotos';
export { default as ScreenWaypointScanShipments } from './wpscanshipments';

export const NAVS = {
  start: { current: 'ScreenSplash', next: 'ScreenDriver' },
  driver: {
    current: 'ScreenDriver',
    previous: 'ScreenSplash',
    next: 'ScreenCar',
  },
  car: {
    current: 'ScreenCar',
    previous: 'ScreenDriver',
    next: 'ScreenTourInfo',
  },
  tourinfo: {
    current: 'ScreenTourInfo',
    previous: 'ScreenCar',
    next: 'ScreenDeliveryScans',
  },
  deliveryscans: {
    current: 'ScreenDeliveryScans',
    previous: 'ScreenTourInfo',
    next: 'ScreenVideosDownload',
  },
  videosdwn: {
    current: 'ScreenVideosDownload',
    previous: 'ScreenDeliveryScans',
    next: 'ScreenWaypointDashboard',
  },
  managers: { current: 'ScreenManagers' },
  wpdashboard: {
    current: 'ScreenWaypointDashboard',
    previous: 'ScreenVideosDownload',
  },
  wpbadcondition: {
    current: 'ScreenWaypointBadCondition',
    next: 'ScreenWaypointResume',
  },
  wpscanarrival: {
    current: 'ScreenWaypointScanArrival',
    previous: 'ScreenWaypointDashboard',
    next: 'ScreenWaypointScanShipments',
  },
  wpcannotscanarrival: {
    current: 'ScreenWaypointCannotScanArrival',
    previous: 'ScreenWaypointScanArrival',
    next: 'ScreenWaypointContactManager',
  },
  wpcontactmanager: {
    current: 'ScreenWaypointContactManager',
    previous: 'ScreenWaypointCannotScanArrival',
    next: 'ScreenWaypointScanShipments',
  },
  wpscanshipments: {
    current: 'ScreenWaypointScanShipments',
    next: 'ScreenWaypointScanPickups',
    previous: 'ScreenWaypointScanArrival',
  },
  wpscanpickups: {
    current: 'ScreenWaypointScanPickups',
    next: 'ScreenWaypointResume',
  },
  wpscanpickupsphotos: {
    current: 'ScreenWaypointScanPickupsPhotos',
    next: 'ScreenWaypointResume',
    previous: 'ScreenWaypointScanPickups',
  },
  wpresume: { current: 'ScreenWaypointResume', next: 'ScreenWaypointEnd' },
};
