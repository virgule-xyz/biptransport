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
  const [hideBarCodeReader, setHideBarCodeReader] = useState(false);

  useEffect(() => {
    if (tempGsmNumber.length === 0 && driverContext.gsmNumber.length > 0) {
      setTempGsmNumber(driverContext.gsmNumber);
    }
    setHideBarCodeReader(showGSMInput);
  });

  const onBarCodeSuccess = () => {
    setTimeout(() => {
      setShowGSMInput(true);
    }, 500);
  };

  const onBarCodeError = value => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      alert(value);
    }, 500);
  };

  const onChangeInputGSM = text => setTempGsmNumber(text);

  const onPressValidateGSM = () => {
    driverContext
      .setGSMNumber(tempGsmNumber)
      .then(() => {
        setShowGSMInput(false);
        setHideBarCodeReader(true);
        setTimeout(() => {
          // FIXME: navigate to driver screen
        }, 500);
      })
      .catch(() => {
        // eslint-disable-next-line no-undef
        alert('Impossible de sauvegarder votre numéro...');
      });
  };

  const onPressCancelInputGSM = () => {
    setShowGSMInput(false);
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
              hide={hideBarCodeReader}
            />
          </CContent>
          <Dialog.Container visible={showGSMInput}>
            <Dialog.Title>
              {firstname} {lastname}
            </Dialog.Title>
            <Dialog.Description>
              Veuillez confirmer votre numéro de portable ({tempGsmNumber}) afin d'être joint par
              votre superviseur.
            </Dialog.Description>
            <Dialog.Input
              defaultValue={gsmNumber}
              numberOfLines={1}
              onChangeText={onChangeInputGSM}
            />
            <Dialog.Button label="Annuler" onPress={onPressCancelInputGSM} />
            <Dialog.Button
              bold
              disabled={tempGsmNumber.length < 10}
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
