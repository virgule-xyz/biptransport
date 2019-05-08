/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import { webservice, WS } from '@webservices';
import { TOUR_SAMPLE, COMMANDS_SAMPLE, COMMANDS_SAMPLE_ERROR } from '@webservices/shapes';
import { env } from '../../package.json';

// Get the tour datas
const getCommands = num => {
  if (env === 'test') {
    return new Promise((resolve, reject) => {
      if (num === TOUR_SAMPLE.bordereau_id) resolve(COMMANDS_SAMPLE);
      // eslint-disable-next-line prefer-promise-reject-errors
      else reject(COMMANDS_SAMPLE_ERROR);
    });
  }

  return webservice({ url: WS.COMMANDS, params: { key: WS.KEY, num } });
};

export default getCommands;
