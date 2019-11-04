/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { H1 } from 'native-base';

/**
 * Wrapper around Native Base titles, bolded and centered, text in uppercase.
 */
const CTitle = ({ children, style, ...props }) => (
  <H1 {...props} testID={props.testID} style={[{ fontWeight: 'bold', textAlign: 'center' }, style]}>
    {`${children}`.toUpperCase()}
  </H1>
);

export default CTitle;
