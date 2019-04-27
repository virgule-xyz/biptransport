import React, { useState } from 'react';
import { CContent, CButton, CBarCodeReader } from '@components';
import Dialog from 'react-native-dialog';

const ScreenDriver = () => {
  const [showGSMInput, setShowGSMInput] = useState(false);
  const [gsmNumber, setGSMNumber] = useState('');
  const [hideBarCodeRead,setHideBarCodeReader]=useState(false);

  const onPressContinue = () => {
    alert('continue');
  };

  const verificator = code => new Promise(resolve => resolve(code));

  const onSuccess = () => {
    setHideBarCodeReader(true);
    setTimeout(() => {
      setShowGSMInput(true);
    }, 500);
  };

  const onError = () => {
    setHideBarCodeReader(false);
    // console.warn('error is ', error);;
    // setShowGSMInput(false);
  };

  const onChangeInputGSM = text => setGSMNumber(text);

  const onPressValidateGSM = () => {
    setHideBarCodeReader(true);
    setShowGSMInput(false);
    setTimeout(() => {
      alert(gsmNumber);
    }, 500);
  };

  const onPressCancelInputGSM = () => {
    setShowGSMInput(false);
    setHideBarCodeReader(false);
    setGSMNumber('');
  };

  return (
    <>
      <CContent title="Code de tournée" fullscreen>
        <CBarCodeReader verificator={verificator} onSuccess={onSuccess} onError={onError} hide={hideBarCodeRead} />
      </CContent>
      <Dialog.Container visible={showGSMInput}>
        <Dialog.Title>Votre numéro</Dialog.Title>
        <Dialog.Description>
          Veuillez confirmer votre numéro de portable afin d'être joint par votre superviseur.
        </Dialog.Description>
        <Dialog.Input numberOfLines={1} onChangeText={onChangeInputGSM} />
        <Dialog.Button label="Annuler" onPress={onPressCancelInputGSM} />
        <Dialog.Button
          bold
          disabled={gsmNumber.length < 6}
          label="Valider"
          onPress={onPressValidateGSM}
        />
      </Dialog.Container>
    </>
  );
};

export default ScreenDriver;
