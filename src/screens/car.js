import React, { useState, useEffect, useContext } from 'react';
import { Alert, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { CSpace, CContent, CText, CBarCodeReader, DEFAULT_FONT_SIZE } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from '@screens';
import Dialog from 'react-native-dialog';
import { splashname } from '../../package.json';

/**
 * Should display a barcode reader to get car infos displayed in a dialog input
 * For tests use code V0000017
 *
 * @param {*} { navigation }
 * @returns ReactNode
 */
const ScreenCar = ({ navigation }) => {
  // manage the context
  const appContext = useContext(AppContext);

  // manage the dialog input
  const [showCarConfirm, setShowCarConfirm] = useState(false);
  // manage the bar code reader
  const [hideCarBarCodeRead, setHideCarBarCodeReader] = useState(false);

  // manage modals show/hide
  useEffect(() => {
    setHideCarBarCodeReader(appContext.hideCarCodeBar);
  }, [appContext.hideCarCodeBar]);

  /**
   * vehicle barcode is suitable for a car
   *
   * @param {*} value
   */
  const onBarCodeSuccess = value => {
    setTimeout(() => {
      setHideCarBarCodeReader(true);
      setShowCarConfirm(true);
    }, 500);
  };

  // vehicle barcode is not suitable
  const onBarCodeError = (value, cb) => {
    setTimeout(() => {
      const mesg = value.error || value;
      Alert.alert(
        splashname,
        mesg,
        [
          {
            text: 'Fermer',
            style: 'cancel',
            onPress: () => {
              setHideCarBarCodeReader(false);
              setShowCarConfirm(false);
              cb && cb();
            },
          },
        ],
        { cancelable: false },
      );
    }, 500);
  };

  // Confirm that the car is the one driver will use
  const onPressCarConfirm = () => {
    setShowCarConfirm(false);
    setHideCarBarCodeReader(true);
    appContext.setHideCarBarCodeReader(true);
    navigation.navigate(NAVS.car.next);
  };

  // the driver wants another car
  const onPressCancelCarConfirm = () => {
    setShowCarConfirm(false);
    setHideCarBarCodeReader(false);
  };

  // speed return to home
  const onPressBackHome = () => {
    appContext.setHideCarBarCodeReader(false);
    navigation.navigate(NAVS.car.previous);
  };

  return (
    <AppContext.Consumer>
      {({ car, hideCarCodeBar, getCarDatas }) => (
        <>
          <CContent title="Code de véhicule" fullscreen pressBackHome={onPressBackHome}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <CText style={{ textAlign: 'center', fontSize: (DEFAULT_FONT_SIZE * 3) / 4 }}>
                {`Scannez le code barre du véhicule\nque vous utiliserez pour votre tournée.`}
              </CText>
              <CSpace />
              <CBarCodeReader
                testID="ID_CARBARCODE"
                verificator={getCarDatas}
                onSuccess={onBarCodeSuccess}
                onError={onBarCodeError}
                hide={hideCarCodeBar}
              />
            </View>
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
