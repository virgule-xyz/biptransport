/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { CButton, CSpace, CSpinner, COLORS } from '@components';
import { RNCamera } from 'react-native-camera';
import Dialog from 'react-native-dialog';
import PropTypes from 'prop-types';

const RAPPORT = 4 / 5;

/**
 * Scan for a barcode, the verificator take the barcode and returns a promise with a returned value in onSuccess or an error in onError if the barcode is wrong
 * hide the camera for some display errors
 */
const CBarCodeReader = ({ verificator, onSuccess, onError, hide, input, testID }) => {
  const { width } = Dimensions.get('window');

  let isBarCodeRead = false;

  const [showBarcodeInput, setShowBarcodeInput] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [stopCamera, setStopCamera] = useState(false);

  // should stop the camera to allow alert display
  useEffect(() => {
    const useEffectAsync = async v => {
      setStopCamera(v);
    };

    useEffectAsync(hide || showBarcodeInput);
  }, [hide, showBarcodeInput]);

  // Test if barcode is a good number via `verificator`
  const testBarCode = code => {
    if (isBarCodeRead === false) {
      isBarCodeRead = true;
      setStopCamera(true);
      verificator(code.toUpperCase())
        .then(value => {
          setBarcode('');
          if (onSuccess) {
            onSuccess(value);
          }
          setStopCamera(true);
          isBarCodeRead = false;
        })
        .catch(value => {
          setStopCamera(false);
          setBarcode('');
          if (onError) {
            onError((value && value.message) || value);
          }
          isBarCodeRead = false;
        });
    }
  };

  // stop the camera, check if barcode read is valuable and then run according functions
  const onBarCodeRead = event => {
    testBarCode(event.data);
  };

  // press the button that display the bar code input
  const onPressManual = () => {
    isBarCodeRead = true;
    // setStopCamera(true);
    setShowBarcodeInput(true);
  };

  // cancel and close the input barcode manual window
  const onPressCancelManual = () => {
    isBarCodeRead = false;
    // setStopCamera(false);
    setShowBarcodeInput(false);
    setBarcode('');
  };

  // press the ok button after entering a manual code
  const onPressValidateManual = () => {
    setShowBarcodeInput(false);
    setTimeout(() => {
      const barcoderead = barcode;
      testBarCode(barcoderead);
    }, 500);
  };

  // on type event to get the code entered
  const onChangeCode = text => {
    setBarcode(text);
  };

  // Tap outside the box
  const reactNativeModalProps = {
    onBackdropPress: onPressCancelManual,
  };

  return (
    <>
      <View
        style={{
          flex: 0,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        testID={testID}
      >
        <RNCamera
          testID={`${testID}_RNCAMERA`}
          captureAudio={false}
          style={[
            {
              width: width * RAPPORT,
              height: width * RAPPORT,
              flex: 0,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={!stopCamera && onBarCodeRead}
          enabled={!stopCamera}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY')
              return (
                <View
                  style={{
                    width: width * RAPPORT,
                    height: width * RAPPORT,
                    display: 'flex',
                  }}
                >
                  <CSpinner />
                </View>
              );
            if (stopCamera) {
              camera.pausePreview();
            } else {
              camera.resumePreview();
            }
            return (
              <View
                style={{
                  width: (width * RAPPORT) / 2,
                  height: (width * RAPPORT) / 2,
                  borderWidth: 3,
                  borderColor: stopCamera ? COLORS.JYVAIS : COLORS.DANGER,
                  flex: 0,
                }}
              />
            );
          }}
        </RNCamera>
        {input && (
          <>
            <CSpace />
            <CButton
              testID={`${testID}_MANUAL_BUTTON`}
              icon="search"
              block
              light
              label="Saisir manuellement..."
              onPress={onPressManual}
            />
          </>
        )}
      </View>
      <Dialog.Container
        visible={showBarcodeInput}
        testID={`${testID}_MANUAL_DIALOG`}
        {...reactNativeModalProps}
      >
        <Dialog.Title>Saisie manuelle</Dialog.Title>
        <Dialog.Description>Saisissez manuellement un code puis validez.</Dialog.Description>
        <Dialog.Input
          numberOfLines={1}
          onChangeText={onChangeCode}
          wrapperStyle={{ borderBottomWidth: 1, borderBottomColor: COLORS.GREY }}
          testID={`${testID}_MANUAL_DIALOG_INPUT`}
        />
        <Dialog.Button
          label="Annuler"
          onPress={onPressCancelManual}
          testID={`${testID}_MANUAL_DIALOG_CANCEL`}
        />

        <Dialog.Button
          bold
          disabled={barcode.length <= 2}
          label="Valider"
          onPress={onPressValidateManual}
          testID={`${testID}_MANUAL_DIALOG_OK`}
        />
      </Dialog.Container>
    </>
  );
};

CBarCodeReader.propTypes = {
  verificator: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired,
  input: PropTypes.bool,
};

CBarCodeReader.defaultProps = {
  input: true,
};

export default CBarCodeReader;
