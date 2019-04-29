import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Grid, Row, Col } from 'native-base';
import { Overlay } from 'react-native-elements';

/**
 * Allow to display a modal window by setting show to true/false
 * Add some callback for onCancel, onContinue and onClose
 * If callback are provided then corresponding buttons are also displayed
 */
const CModal = ({ children, onCancel, onContinue, onClose, show }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const onPressCancel = () => {
    onCancel();
  };

  const onPressContinue = () => {
    onContinue();
  };

  const onPressClose = () => {
    onClose();
  };

  return (
    <Overlay
      isVisible={isVisible}
      overlayBackgroundColor="white"
      width="90%"
      height="80%"
      fullscreen
    >
      <Grid>
        <Row>{children}</Row>
        <Row style={{ height: 50, flex: 0 }}>
          {onCancel && (
            <Col style={{ marginHorizontal: 7 }}>
              <Button block danger onPress={onPressCancel}>
                <Text style={{ color: '#ffffff' }}>Annuler</Text>
              </Button>
            </Col>
          )}
          {onContinue && (
            <Col style={{ marginHorizontal: 7 }}>
              <Button block primary onPress={onPressContinue}>
                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Continuer</Text>
              </Button>
            </Col>
          )}
          {!onCancel && !onContinue && (
            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button block primary onPress={onPressClose}>
                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Fermer</Text>
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
