/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import { webservice, WS, isTest } from '@webservices';

// Put a proof that arrival barcode is not readable
const putProof = ({ picture, num, bordereau_id, chauffeur_id, vehicule_id, dt, lat, lng }) => {
  if (isTest()) {
    return new Promise((resolve, reject) => {
      resolve({ result: 'ok', code: '2020' });
    });
  }

  return webservice({
    postit: true,
    url: WS.URL.BLOCAGE,
    params: {
      key: WS.KEY,
      num,
      bordereau_id,
      chauffeur_id,
      vehicule_id,
      dt,
      lat,
      lng,
      photo_blocage: picture,
    },
  });
};

export default putProof;
