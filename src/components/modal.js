/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Button, Grid, Row, Col } from 'native-base';
import { COLORS, DEFAULT_FONT_SIZE } from '@components';
import { Overlay } from 'react-native-elements';
import PropTypes from 'prop-types';

/**
 * Allow to display a modal window by setting show to true/false
 * Add some callback for onCancel, onContinue and onClose
 * If callback are provided then corresponding buttons are also displayed
 */
const CModal = ({ children, onCancel, onContinue, onClose, show, testID }) => {
  const [isStateVisible, setIsStateVisible] = useState(show);

  useEffect(() => {
    const useEffectAsync = async v => {
      setIsStateVisible(v);
    };

    useEffectAsync(show);
  }, [show]);

  return (
    <Overlay
      isVisible={isStateVisible}
      overlayBackgroundColor={COLORS.BACKGROUND}
      width="100%"
      height="100%"
      fullscreen
    >
      <Grid>
        <Row testID={`${testID}`} style={{ flexDirection: 'column' }}>
          {children}
        </Row>
        <Row style={{ height: DEFAULT_FONT_SIZE * 3, flex: 0 }}>
          {onCancel && (
            <Col style={{ marginHorizontal: DEFAULT_FONT_SIZE / 2 }}>
              <Button testID={`${testID}_CANCEL`} block danger onPress={onCancel}>
                <Text style={{ color: COLORS.BACKGROUND }}>Annuler</Text>
              </Button>
            </Col>
          )}
          {onContinue && (
            <Col style={{ marginHorizontal: DEFAULT_FONT_SIZE / 2 }}>
              <Button testID={`${testID}_CONTINUE`} block primary onPress={onContinue}>
                <Text style={{ color: COLORS.BACKGROUND, fontWeight: 'bold' }}>Continuer</Text>
              </Button>
            </Col>
          )}
          {!onCancel && !onContinue && (
            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button testID={`${testID}_CLOSE`} block primary onPress={onClose}>
                <Text style={{ color: COLORS.BACKGROUND, fontWeight: 'bold' }}>Fermer</Text>
              </Button>
            </Col>
          )}
        </Row>
      </Grid>
    </Overlay>
  );
};

CModal.propTypes = {
  show: PropTypes.bool,
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
  onClose: PropTypes.func,
};

CModal.defaultProps = {
  show: false,
  onCancel: null,
  onContinue: null,
  onClose: () => {},
};

export default CModal;
