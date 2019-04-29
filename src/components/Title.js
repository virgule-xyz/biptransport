import React from 'react';
import { H1 } from 'native-base';

/**
 * Wrapper around Native Base titles, bolded and centered, text in uppercase.
 */
const CTitle = ({ children, ...props }) => (
  <H1 {...props} style={{ fontWeight: 'bold', textAlign: 'center' }}>
    {`${children}`.toUpperCase()}
  </H1>
);

export default CTitle;
