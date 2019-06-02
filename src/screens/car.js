import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { withNavigation } from 'react-navigation';

import { CSpace, CContent, CText, CBarCodeReader, DEFAULT_FONT_SIZE } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from '@screens';
import Dialog from 'react-native-dialog';

/**
 * Should display a barcode reader to get car infos displayed in a dialog input
 * For tests use code V0000017
 */
const ScreenCar = ({ navigation }) => {
  // manage the context
  const appContext = useContext(AppContext);

  // manage the dialog input
  const [showCarConfirm, setShowCarConfirm] = useState(false);
  // manage the bar code reader
  const [hideBarCodeRead, setHideBarCodeReader] = useState(false);

  // vehicle barcode is suitable for a car
  const onBarCodeSuccess = value => {
    setTimeout(() => {
      setHideBarCodeReader(true);
      setShowCarConfirm(true);
    }, 500);
  };

  // vehicle barcode is not suitable
  const onBarCodeError = value => {
    setTimeout(() => {
      if (value.error) Alert.alert(value.error);
      else Alert.alert("Ce véhicule n'existe pas...");
      setHideBarCodeReader(false);
      setShowCarConfirm(false);
    }, 500);
  };

  // Confirm that the car is the one driver will use
  const onPressCarConfirm = () => {
    setHideBarCodeReader(true);
    setShowCarConfirm(false);
    setTimeout(() => {
      appContext.save();
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
    <AppContext.Consumer>
      {({ car, getCarDatas }) => (
        <>
          <CContent title="Code de véhicule" fullscreen pressBackHome={onPressBackHome}>
            <CText style={{ textAlign: 'center', fontSize: (DEFAULT_FONT_SIZE * 3) / 4 }}>
              {`Scannez le code barre du véhicule\nque vous utiliserez pour votre tournée.`}
            </CText>
            <CSpace />
            <CBarCodeReader
              testID="ID_CARBARCODE"
              verificator={getCarDatas}
              onSuccess={onBarCodeSuccess}
              onError={onBarCodeError}
              hide={hideBarCodeRead}
            />
          </CContent>
          {car && (
            <Dialog.Container visible={showCarConfirm}>
              <Dialog.Title testID="ID_CARRESUME_TITLE">Votre véhicule</Dialog.Title>
              <Dialog.Description>
                {`${car.immat}
${car.alert || 'Aucun problème à signaler'}`}
              </Dialog.Description>
              <Dialog.Button label="Autre véhicule" onPress={onPressCancelCarConfirm} />
              <Dialog.Button
                testID="ID_CARRESUME_OK"
                bold
                label="Continuer"
                onPress={onPressCarConfirm}
              />
            </Dialog.Container>
          )}
        </>
      )}
    </AppContext.Consumer>
  );
};

export default withNavigation(ScreenCar);
