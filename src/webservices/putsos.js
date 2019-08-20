/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import { webservice, WS, isTest } from '@webservices';

// Get the tour datas
const putSos = ({ bordereau_id, chauffeur_id, vehicule_id, lat, lng }) => {
  if (isTest()) {
    return new Promise((resolve, reject) => {
      resolve({ result: 'ok' });
    });
  }

  return webservice({
    postit: true,
    url: WS.URL.SOS,
    params: { key: WS.KEY, bordereau_id, chauffeur_id, vehicule_id, lat, lng },
  });
};

export default putSos;
