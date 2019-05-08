/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import axios from 'axios';

export const webservice = ({ url, params }) => {
  return axios.get(url, { params });
};
