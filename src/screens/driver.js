import React, { useState, useContext, useEffect } from 'react';
import { CContent, CBarCodeReader } from '@components';
import { DriverContext } from '@contexts';
import Dialog from 'react-native-dialog';

/**
 * Should display a barcode reader to get driver infos
 * Display an Dialog Input to validate driver GMS
 */
const ScreenDriver = () => {
  // manage the driver context
  const driverContext = useContext(DriverContext);
  // manage dialog gsm
  const [showGSMInput, setShowGSMInput] = useState(false);
  // manage gsm number entered
  const [tempGsmNumber, setTempGsmNumber] = useState(driverContext.gsmNumber);
  // manage hiding the barcode
  const [hideBarCodeRead, setHideBarCodeReader] = useState(false);

  const onBarCodeSuccess = () => {
    setShowGSMInput(true);
    // setHideBarCodeReader(false);
  };

  const onBarCodeError = value => {
    // FIXME: barcodereader still disabled
    setHideBarCodeReader(false);
    // eslint-disable-next-line no-undef
    alert(value);
  };

  const onChangeInputGSM = text => setTempGsmNumber(text);

  const onPressValidateGSM = () => {
    driverContext.setGSMNumber(tempGsmNumber);
    setShowGSMInput(false);
    // setHideBarCodeReader(false);
    // eslint-disable-next-line no-undef
    alert('Navigate');
    // FIXME: navigate to driver screen
  };

  const onPressCancelInputGSM = () => {
    setShowGSMInput(false);
    // setHideBarCodeReader(false);
    setTempGsmNumber('');
  };

  return (
    <DriverContext.Consumer>
      {({ gsmNumber, firstname, lastname, getDriverDatas }) => (
        <>
          <CContent title="Code de tournée" fullscreen>
            <CBarCodeReader
              verificator={getDriverDatas}
              onSuccess={onBarCodeSuccess}
              onError={onBarCodeError}
              hide={hideBarCodeRead}
            />
          </CContent>
          <Dialog.Container visible={showGSMInput}>
            <Dialog.Title>
              {firstname} {lastname}
            </Dialog.Title>
            <Dialog.Description>
              Veuillez confirmer votre numéro de portable afin d'être joint par votre superviseur.
            </Dialog.Description>
            <Dialog.Input
              defaultValue={gsmNumber}
              numberOfLines={1}
              onChangeText={onChangeInputGSM}
            />
            <Dialog.Button label="Annuler" onPress={onPressCancelInputGSM} />
            <Dialog.Button
              bold
              disabled={gsmNumber.length < 6}
              label="Valider"
              onPress={onPressValidateGSM}
            />
          </Dialog.Container>
        </>
      )}
    </DriverContext.Consumer>
  );
};

export default ScreenDriver;
