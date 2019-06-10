/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { Text } from 'native-base';

/**
 * Wrapper around Natie Base text
 */
const CText = ({ children, ...props }) => <Text {...props}>{children}</Text>;

export default CText;
