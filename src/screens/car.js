import React, { useState } from 'react';
import { CSpace, CContent, CText, CBarCodeReader, DEFAULT_FONT_SIZE } from '@components';
import Dialog from 'react-native-dialog';

const ScreenCar = () => {
  const [showCarConfirm, setShowCarConfirm] = useState(false);
  const [hideBarCodeRead, setHideBarCodeReader] = useState(false);

  const verificator = code => new Promise(resolve => resolve(code));

  // vehicle barcode is suitable for a car
  const onSuccess = () => {
    setHideBarCodeReader(true);
    setTimeout(() => {
      setShowCarConfirm(true);
    }, 500);
  };

  // vehicle barcode is not suitable
  const onError = () => {
    setHideBarCodeReader(false);
    setShowCarConfirm(false);
  };

  // Confirm that the car is the one driver will use
  const onPressCarConfirm = () => {
    setHideBarCodeReader(true);
    setShowCarConfirm(false);
    setTimeout(() => {
      alert('continue');
    }, 500);
  };

  // the driver wants another car
  const onPressCancelCarConfirm = () => {
    setShowCarConfirm(false);
    setHideBarCodeReader(false);
  };

  return (
    <>
      <CContent title="Code de véhicule" fullscreen>
        <CText style={{ textAlign: 'center', fontSize: (DEFAULT_FONT_SIZE * 3) / 4 }}>
          {`Scannez le code barre du véhicule
que vous utiliserez pour votre tournée.`}
        </CText>
        <CSpace />
        <CBarCodeReader
          verificator={verificator}
          onSuccess={onSuccess}
          onError={onError}
          hide={hideBarCodeRead}
        />
      </CContent>
      <Dialog.Container visible={showCarConfirm}>
        <Dialog.Title>Votre véhicule</Dialog.Title>
        <Dialog.Description>Ford Fiesta AB-123-CD</Dialog.Description>
        <Dialog.Button label="Autre véhicule" onPress={onPressCancelCarConfirm} />
        <Dialog.Button bold label="Continuer" onPress={onPressCarConfirm} />
      </Dialog.Container>
    </>
  );
};

export default ScreenCar;
