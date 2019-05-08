/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */
const setGsmNumber = ({ code, gsmNumber }) => {
  return new Promise((resolve, reject) => {
    if (code === '1' && gsmNumber.length >= 10) {
      resolve();
    } else reject();
  });
};

export default setGsmNumber;
