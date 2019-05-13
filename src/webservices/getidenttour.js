/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */
import { webservice, WS, isTest } from './index';
import { TOUR_BARCODES, TOUR_SAMPLE, TOUR_SAMPLE_ERROR } from './shapes';

// Get the tour datas
const getIdentTour = num => {
  if (isTest()) {
    return new Promise((resolve, reject) => {
      if (TOUR_BARCODES.indexOf(num) >= 0) resolve(TOUR_SAMPLE);
      // eslint-disable-next-line prefer-promise-reject-errors
      else reject(TOUR_SAMPLE_ERROR);
    });
  }
  return webservice({ url: WS.URL.TOUR, params: { key: WS.KEY, num } });
};

export default getIdentTour;
