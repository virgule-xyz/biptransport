/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { Image } from 'react-native';
import { Header, Button, Body, Grid, Col, Row } from 'native-base';
import { CText, DEFAULT_FONT_SIZE, COLORS, CRescueButton } from '@components';
import PropTypes from 'prop-types';

import { LOGO } from '@medias';

/**
 * Expliquer ce que fait le composant et comment utiliser les props
 */
const CMiniHeader = ({ numero, dateString, name, pressCallManagers, pressRescueButton }) => {
  const rescueButton = <CRescueButton onPress={pressRescueButton} />;
  return (
    <Header style={{ backgroundColor: COLORS.BACKGROUND, height: DEFAULT_FONT_SIZE * 7 }}>
      <Body>
        <Grid>
          <Col style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
            <Button transparent onPress={pressCallManagers} testID="ID_MANAGERS_SCREEN">
              <Image source={LOGO} resizeMode="contain" style={{ flex: 1 }} />
            </Button>
          </Col>
          <Col>
            <Row>
              <Col style={{ justifyContent: 'center', alignItems: 'flex-end' }}>{rescueButton}</Col>
              <Col style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                <CText
                  style={{
                    fontSize: DEFAULT_FONT_SIZE * 2,
                    fontWeight: 'bold',
                  }}
                >
                  {numero}
                </CText>
                <CText style={{ fontSize: (DEFAULT_FONT_SIZE * 2) / 3 }}>{dateString}</CText>
              </Col>
            </Row>
            <Row style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <CText>{name && name.toUpperCase()}</CText>
            </Row>
          </Col>
        </Grid>
      </Body>
    </Header>
  );
};

CMiniHeader.propTypes = {
  numero: PropTypes.string.isRequired,
  dateString: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pressCallManagers: PropTypes.func.isRequired,
  pressRescueButton: PropTypes.func.isRequired,
};

export default CMiniHeader;
