/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import { webservice, WS, isTest } from '@webservices';

// Put the waypoint datas
const putWaypoint = ({
  num,
  bordereau_id,
  chauffeur_id,
  vehicule_id,
  dt1,
  dt2,
  lat,
  lng,
  erreur,
  nb_liv,
  nb_enl,
  cb_liv,
  cb_enl,
  observations,
  photo_condition,
  condition_is_video,
  photo_blocage,
  photo_enlevement,
  enlevement_is_video,
}) => {
  if (isTest()) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  return webservice({
    postit: true,
    url: WS.URL.PASSAGE,
    params: {
      key: WS.KEY,
      num,
      bordereau_id,
      chauffeur_id,
      vehicule_id,
      dt1,
      dt2,
      lat,
      lng,
      erreur,
      nb_liv,
      nb_enl,
      cb_liv,
      cb_enl,
      observations,
      photo_condition,
      condition_is_video,
      photo_blocage,
      photo_enlevement,
      enlevement_is_video,
    },
  });
};

export default putWaypoint;
