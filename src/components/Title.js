/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { H1 } from 'native-base';

const CTitle = ({ children, ...props }) => <H1 {...props}>{children}</H1>;

export default CTitle;
