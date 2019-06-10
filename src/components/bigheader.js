/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { Image, Dimensions } from 'react-native';
import { Header, Button, Body } from 'native-base';
import { COLORS, LOGO_REPORT } from '@components';
import PropTypes from 'prop-types';

import { LOGO } from '@medias';

/**
 * L'en-tête avec le grand logo
 */
const CBigHeader = ({ pressBackHome }) => {
  const { width } = Dimensions.get('window');

  return (
    <Header
      style={{
        width,
        height: LOGO_REPORT * width,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: COLORS.BACKGROUND,
      }}
      testID="ID_BIGHEADER"
    >
      <Body
        style={{
          flex: 0,
          height: '100%',
          width: '100%',
          marginHorizontal: 0,
          marginVertical: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.BACKGROUND,
        }}
      >
        <Button transparent onPress={pressBackHome}>
          <Image source={LOGO} resizeMode="contain" style={{ flex: 1 }} />
        </Button>
      </Body>
    </Header>
  );
};

CBigHeader.propTypes = {
  pressBackHome: PropTypes.func.isRequired,
};

export default CBigHeader;
