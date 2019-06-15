/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { Container, Content } from 'native-base';
import { CSpace, CMiniHeader, CBigHeader, CTitle } from '@components';
import PropTypes from 'prop-types';

/**
 * The main screen with a header (full or mini), the content and a title. Eventually centered.
 */
const CContent = ({
  children,
  fullscreen,
  center,
  top,
  stretch,
  title,
  numero,
  dateString,
  name,
  pressRescueButton,
  pressCallManagers,
  pressBackHome,
}) => {
  let ccStyle = null;
  ccStyle = {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  };

  if (center)
    ccStyle = {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow',
    };
  if (top)
    ccStyle = {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: 'red',
    };
  if (stretch)
    ccStyle = {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: 'grey',
    };

  return (
    <Container>
      {!fullscreen && (
        <CMiniHeader
          numero={numero}
          dateString={dateString}
          name={name}
          pressRescueButton={pressRescueButton}
          pressCallManagers={pressCallManagers}
        />
      )}
      {fullscreen && <CBigHeader pressBackHome={pressBackHome} />}
      <Content padder contentContainerStyle={ccStyle} style={{ flex: 1 }}>
        {title && (
          <>
            <CTitle>{title}</CTitle>
            <CSpace />
          </>
        )}
        {children}
      </Content>
    </Container>
  );
};

CContent.propTypes = {
  title: PropTypes.string,
  fullscreen: PropTypes.bool,
  center: PropTypes.bool,
  top: PropTypes.bool,
  stretch: PropTypes.bool,
  pressCallManagers: PropTypes.func,
  pressRescueButton: PropTypes.func,
  pressBackHome: PropTypes.func,
  numero: PropTypes.string,
  dateString: PropTypes.string,
  name: PropTypes.string,
};

CContent.defaultProps = {
  title: null,
  fullscreen: false,
  center: false,
  top: false,
  stretch: false,
  pressCallManagers: null,
  pressRescueButton: null,
  pressBackHome: null,
  numero: '',
  dateString: '',
  name: '',
};

export default CContent;
