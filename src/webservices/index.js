import { env } from '../../package';

// export { default as checkBarcode } from './barcode';
export { default as webservice } from './functions';
export { default as getIdentVehicle } from './getidentvehicle';
export { default as getCommands } from './getcommands';
export { default as setGsmNumber } from './setgsmnumber';
export { default as getIdentTour } from './getidenttour';
export { default as WS } from './constants';

export const isTest = () => {
  return env === 'test' || env === 'e2e';
};
