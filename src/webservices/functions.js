/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import axios from 'axios';

const webservice = ({ url, params }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(({ data, status }) => {
        if (status === 200 && data.result === 'OK') {
          resolve(data);
        } else {
          reject((data.error && data.error) || data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default webservice;
