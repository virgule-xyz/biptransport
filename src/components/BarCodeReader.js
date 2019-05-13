import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'react-native-dialog';
import { Dimensions, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { CButton, CSpace } from '@components';

const RAPPORT = 4 / 5;

/**
 * Scan for a barcode, the verificator take the barcode and returns a promise with a returned value in onSuccess or an error in onError if the barcode is wrong
 * hide the camera for some display errors
 */
const CBarCodeReader = ({ verificator, onSuccess, onError, hide, testID }) => {
  const { width } = Dimensions.get('window');

  const [showBarcodeInput, setShowBarcodeInput] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [stopCamera, setStopCamera] = useState(false);

  // should stop the camera to allow alert display
  useEffect(() => {
    setStopCamera(hide || showBarcodeInput);
  }, [hide, showBarcodeInput]);

  // stop the camera, check if barcode read is valuable and then run according functions
  const onBarCodeRead = ({ barcodes }) => {
    verificator(barcodes)
      .then(value => {
        if (onSuccess) {
          setBarcode('');
          setStopCamera(true);
          onSuccess(value);
        }
      })
      .catch(value => {
        if (onError) {
          setBarcode('');
          onError((value && value.message) || value);
        }
      });
  };

  // press the button that display the bar code input
  const onPressManual = () => {
    setShowBarcodeInput(true);
  };

  // cancel and close the input barcode manual window
  const onPressCancelManual = () => {
    setShowBarcodeInput(false);
    setBarcode('');
  };

  // press the ok button after entering a manual code
  const onPressValidateManual = () => {
    setShowBarcodeInput(false);
    setTimeout(() => {
      const barcoderead = barcode;
      setBarcode('');
      onBarCodeRead({ barcodes: barcoderead });
    }, 500);
  };

  // on type event to get the code entered
  const onChangeCode = text => {
    setBarcode(text);
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
            stopCamera && { display: 'none' },
            { width: width * RAPPORT, height: width * RAPPORT },
          ]}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={onBarCodeRead}
          enabled={false}
        />
        <View
          style={[
            {
              width: width * RAPPORT,
              height: width * RAPPORT,
              backgroundColor: 'grey',
              display: 'none',
            },
            stopCamera && { display: 'flex' },
          ]}
        />
        <CSpace />
        <CButton
          testID={`${testID}_MANUAL_BUTTON`}
          icon="search"
          block
          light
          label="Saisir manuellement..."
          onPress={onPressManual}
        />
      </View>
      <Dialog.Container visible={showBarcodeInput} testID={`${testID}_MANUAL_DIALOG`}>
        <Dialog.Title>Saisie manuelle</Dialog.Title>
        <Dialog.Description>Saisissez manuellement un code puis validez.</Dialog.Description>
        <Dialog.Input
          numberOfLines={1}
          onChangeText={onChangeCode}
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
};

export default CBarCodeReader;
