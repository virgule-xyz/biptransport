import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigation } from 'react-navigation';

import { CContent, CBarCodeReader } from '@components';
import { DriverContext } from '@contexts';
import { NAVS } from '@screens';
import Dialog from 'react-native-dialog';

/**
 * Should display a barcode reader to get driver infos
 * Display an Dialog Input to validate driver GMS
 */
const ScreenDriver = ({ navigation }) => {
  // manage the driver context
  const driverContext = useContext(DriverContext);
  // manage dialog gsm
  const [showGSMInput, setShowGSMInput] = useState(false);
  // manage gsm number entered
  const [tempGsmNumber, setTempGsmNumber] = useState(driverContext.gsmNumber);
  // manage hiding the barcode
  const [hideBarCodeReader, setHideBarCodeReader] = useState(false);

  // manage modals show/hide
  useEffect(() => {
    if (tempGsmNumber.length === 0 && driverContext.gsmNumber.length > 0) {
      setTempGsmNumber(driverContext.gsmNumber);
    }
    setHideBarCodeReader(showGSMInput);
  });

  // if successfully read a bar code then display GSM modal
  // need to timed for display... probably due to setState
  const onBarCodeSuccess = () => {
    setTimeout(() => {
      setShowGSMInput(true);
    }, 500);
  };

  // if error on read show it
  const onBarCodeError = value => {
    setTimeout(() => {
      Alert.alert(value);
    }, 500);
  };

  // input get the text entered for future usage
  const onChangeInputGSM = text => setTempGsmNumber(text);

  // Ok change the GSM in the DB
  const onPressValidateGSM = () => {
    driverContext
      .setGSMNumber(tempGsmNumber)
      .then(() => {
        setShowGSMInput(false);
        setHideBarCodeReader(true);
        setTimeout(() => {
          navigation.navigate(NAVS.driver.next);
        }, 500);
      })
      .catch(() => {
        Alert.alert('Impossible de sauvegarder votre numéro...');
      });
  };

  const onPressCancelInputGSM = () => {
    setShowGSMInput(false);
    setTempGsmNumber('');
  };

  // Do nothing
  const onPressBackHome = () => {
    navigation.navigate(NAVS.driver.previous);
  };

  return (
    <DriverContext.Consumer>
      {({ gsmNumber, firstname, lastname, getDriverDatas }) => (
        <>
          <CContent title="Code de tournée" fullscreen pressBackHome={onPressBackHome}>
            <CBarCodeReader
              testID="ID_BARCODE"
              verificator={getDriverDatas}
              onSuccess={onBarCodeSuccess}
              onError={onBarCodeError}
              hide={hideBarCodeReader}
            />
          </CContent>
          <Dialog.Container visible={showGSMInput} testID="ID_GSMCONFIRM">
            <Dialog.Title>{`${firstname} ${lastname}`}</Dialog.Title>
            <Dialog.Description>
              {`Veuillez confirmer votre numéro de portable ({tempGsmNumber}) afin d'être joint par votre superviseur.`}
            </Dialog.Description>
            <Dialog.Input
              testID="ID_GSMCONFIRM_INPUT"
              defaultValue={gsmNumber}
              numberOfLines={1}
              onChangeText={onChangeInputGSM}
            />
            <Dialog.Button
              label="Annuler"
              onPress={onPressCancelInputGSM}
              testID="ID_GSMCONFIRM_CANCEL"
            />
            <Dialog.Button
              bold
              disabled={tempGsmNumber.length < 10}
              label="Valider"
              onPress={onPressValidateGSM}
              testID="ID_GSMCONFIRM_OK"
            />
          </Dialog.Container>
        </>
      )}
    </DriverContext.Consumer>
  );
};

export default withNavigation(ScreenDriver);
