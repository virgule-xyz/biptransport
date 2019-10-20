/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import axios from 'axios';
import qs from 'qs';

const webservice = ({ url, params, postit = false }) => {
  const options = {
    method: postit ? 'POST' : 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params),
    url,
  };

  const sender = () => (postit ? axios(options) : axios.get(url, { params }));
  return new Promise((resolve, reject) => {
    sender()
      .then(({ data, status }) => {
        if (status === 200 && data.result === 'OK') {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default webservice;
