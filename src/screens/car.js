import React, { useState } from 'react';
import { Alert } from 'react-native';
import { withNavigation } from 'react-navigation';

import { CSpace, CContent, CText, CBarCodeReader, DEFAULT_FONT_SIZE } from '@components';
import { CarContext } from '@contexts';
import { NAVS } from '@screens';
import Dialog from 'react-native-dialog';

/**
 * Should display a barcode reader to get car infos displayed in a dialog input
 */
const ScreenCar = ({ navigation }) => {
  // manage the dialog input
  const [showCarConfirm, setShowCarConfirm] = useState(false);
  // manage the bar code reader
  const [hideBarCodeRead, setHideBarCodeReader] = useState(false);

  // vehicle barcode is suitable for a car
  const onSuccess = () => {
    setHideBarCodeReader(true);
    setTimeout(() => {
      setShowCarConfirm(true);
    }, 500);
  };

  // vehicle barcode is not suitable
  const onError = () => {
    Alert.alert("Ce véhicule n'existe pas...");
    setHideBarCodeReader(false);
    setTimeout(() => {
      setShowCarConfirm(false);
    }, 500);
  };

  // Confirm that the car is the one driver will use
  const onPressCarConfirm = () => {
    setHideBarCodeReader(true);
    setShowCarConfirm(false);
    setTimeout(() => {
      navigation.navigate(NAVS.car.next);
    }, 500);
  };

  // the driver wants another car
  const onPressCancelCarConfirm = () => {
    setShowCarConfirm(false);
    setHideBarCodeReader(false);
  };

  // speed return to home
  const onPressBackHome = () => {
    navigation.navigate(NAVS.car.previous);
  };

  return (
    <CarContext.Consumer>
      {({ brand, model, license, comment, getCarDatas }) => (
        <>
          <CContent title="Code de véhicule" fullscreen pressBackHome={onPressBackHome}>
            <CText style={{ textAlign: 'center', fontSize: (DEFAULT_FONT_SIZE * 3) / 4 }}>
              {`Scannez le code barre du véhicule\nque vous utiliserez pour votre tournée.`}
            </CText>
            <CSpace />
            <CBarCodeReader
              verificator={getCarDatas}
              onSuccess={onSuccess}
              onError={onError}
              hide={hideBarCodeRead}
            />
          </CContent>
          <Dialog.Container visible={showCarConfirm}>
            <Dialog.Title>Votre véhicule</Dialog.Title>
            <Dialog.Description>
              {`${brand} ${model} ${license}
${comment || 'Aucun problème à signaler'}`}
            </Dialog.Description>
            <Dialog.Button label="Autre véhicule" onPress={onPressCancelCarConfirm} />
            <Dialog.Button bold label="Continuer" onPress={onPressCarConfirm} />
          </Dialog.Container>
        </>
      )}
    </CarContext.Consumer>
  );
};

export default withNavigation(ScreenCar);
