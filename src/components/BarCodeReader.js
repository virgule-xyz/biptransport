import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'react-native-dialog';
import { Dimensions, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { CButton, CSpace } from '@components';

const RAPPORT = 4 / 5;

const CBarCodeReader = ({ verificator, onSuccess, onError }) => {
  const { width } = Dimensions.get('window');

  const [showInput, setShowInput] = useState(false);
  const [barcode, setBarcode] = useState('');

  const onBarCodeRead = ({ barcodes }) => {
    verificator(barcodes)
      .then(value => {
        if (onSuccess) {
          setBarcode('');
          onSuccess(value);
        }
      })
      .catch(value => {
        if (onError) {
          onError(value);
        }
      });
  };

  const onPressManual = () => {
    setShowInput(true);
  };

  const onPressCancelManual = () => {
    setBarcode('');
    setShowInput(false);
  };

  const onPressValidateManual = () => {
    const barcoderead = barcode;
    setBarcode('');
    setShowInput(false);
    onBarCodeRead({ barcodes: barcoderead });
  };

  const onChangeCode = text => {
    setBarcode(text);
  };

  return (
    <View
      style={{
        position: 'relative',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <RNCamera
        captureAudio={false}
        style={{ width: width * RAPPORT, height: width * RAPPORT }}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={onBarCodeRead}
      />
      <CSpace />
      <CButton
        icon="pencil"
        block
        light
        label="Saisir manuellement..."
        onPress={onPressManual}
      />
      <Dialog.Container visible={showInput}>
        <Dialog.Title>Saisie manuelle</Dialog.Title>
        <Dialog.Description>
          Saisissez manuellement un code puis validez.
        </Dialog.Description>
        <Dialog.Input numberOfLines={1} onChangeText={onChangeCode} />
        <Dialog.Button label="Annuler" onPress={onPressCancelManual} />
        <Dialog.Button
          bold
          disabled={barcode.length <= 2}
          label="Valider"
          onPress={onPressValidateManual}
        />
      </Dialog.Container>
    </View>
  );
};

CBarCodeReader.propTypes = {
  verificator: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default CBarCodeReader;
