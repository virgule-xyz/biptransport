/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import { webservice, WS, isTest } from '@webservices';

// change the tel number of driver
const putGsmNumber = ({ chauffeur_id, num_tel }) => {
  if (isTest()) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  debugger;
  const params = { key: WS.KEY, chauffeur_id, num_tel };
  return webservice({
    postit: true,
    url: WS.URL.GSM,
    params,
  });
};

export default putGsmNumber;
