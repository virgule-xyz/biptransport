/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { H1 } from 'native-base';

const CTitle = ({ children, ...props }) => (
  <H1 {...props} style={{ fontWeight: 'bold', textAlign: 'center' }}>
    {`${children}`.toUpperCase()}
  </H1>
);

export default CTitle;
