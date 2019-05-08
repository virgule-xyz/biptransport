/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import { webservice, WS } from '@webservices';
import { VEHICLE_BARCODES, VEHICLE_SAMPLE, VEHICLE_SAMPLE_ERROR } from '@webservices/shapes';
import { env } from '../../package.json';

// Get the vehicle datas
const getIdentVehicle = num => {
  if (env === 'test') {
    return new Promise((resolve, reject) => {
      if (VEHICLE_BARCODES.indexOf(num) >= 0) resolve(VEHICLE_SAMPLE);
      // eslint-disable-next-line prefer-promise-reject-errors
      else reject(VEHICLE_SAMPLE_ERROR);
    });
  }

  return webservice({ url: WS.VEHICLE, params: { key: WS.KEY, num } });
};

export default getIdentVehicle;
