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
const CModal = ({ children, onCancel, onContinue, onClose, show, testID }) => {
  const [isStateVisible, setIsStateVisible] = useState(show);

  useEffect(() => {
    const useEffectAsync = async v => {
      setIsStateVisible(v);
    };

    useEffectAsync(show);
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
      isVisible={isStateVisible}
      overlayBackgroundColor="white"
      width="100%"
      height="100%"
      fullscreen
    >
      <Grid>
        <Row testID={`${testID}`} style={{ flexDirection: 'column' }}>
          {children}
        </Row>
        <Row style={{ height: 50, flex: 0 }}>
          {onCancel && (
            <Col style={{ marginHorizontal: 7 }}>
              <Button testID={`${testID}_CANCEL`} block danger onPress={onPressCancel}>
                <Text style={{ color: '#ffffff' }}>Annuler</Text>
              </Button>
            </Col>
          )}
          {onContinue && (
            <Col style={{ marginHorizontal: 7 }}>
              <Button testID={`${testID}_CONTINUE`} block primary onPress={onPressContinue}>
                <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Continuer</Text>
              </Button>
            </Col>
          )}
          {!onCancel && !onContinue && (
            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button testID={`${testID}_CLOSE`} block primary onPress={onPressClose}>
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
