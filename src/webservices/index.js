import { env, story } from '../../package';

// export { default as checkBarcode } from './barcode';
export { default as webservice } from './functions';
export { default as getIdentTour } from './getidenttour';
export { default as getIdentVehicle } from './getidentvehicle';
export { default as getCommands } from './getcommands';
export { default as putGsmNumber } from './putgsmnumber';
export { default as putSos } from './putsos';
export { default as putWaypoint } from './putwaypoint';
export { default as Pool } from './pool';
export { default as WS } from './constants';

export const isTest = () => {
  return env === 'e2e' || story === true;
};

export const isE2E = () => {
  return env === 'e2e';
};

export const isStory = () => {
  return story === true;
};
