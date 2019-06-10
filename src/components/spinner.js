/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { Spinner } from 'native-base';
import { COLORS } from '@components';

/**
 * Just a wrapper around a Native Base spinner
 */
const CSpinner = () => <Spinner color={COLORS.SPINNER} />;

export default CSpinner;
