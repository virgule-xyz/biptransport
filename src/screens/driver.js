import React, { useState, useContext, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { CContent, CBarCodeReader, CSpace, DEFAULT_FONT_SIZE, CText, COLORS } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from '@screens';
import Dialog from 'react-native-dialog';

import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: 'green',
  diffNameColor: 'darkturquoise',
});

/**
 * Should display a barcode reader to get driver infos
 * Display an Dialog Input to validate driver GMS
 * For tests use BT00249316
 */
const ScreenDriver = ({ navigation }) => {
  // manage the driver context
  const appContext = useContext(AppContext);

  // manage dialog gsm
  const [showGSMInput, setShowGSMInput] = useState(false);
  // manage gsm number entered
  const [tempGsmNumber, setTempGsmNumber] = useState('');
  // manage hiding the barcode
  const [hideDriverBarCodeReader, setHideDriverBarCodeReader] = useState(false);

  // manage modals show/hide
  useEffect(() => {
    const useEffectAsync = async (v, c) => {
      if (v.length === 0 && c.driver.gsm.length > 0) {
        setTempGsmNumber(c.driver.gsm);
      }
    };

    useEffectAsync(tempGsmNumber, appContext);
  }, [tempGsmNumber, appContext.driver, showGSMInput]);

  useEffect(() => {
    setHideDriverBarCodeReader(appContext.hideDriverCodeBar);
  }, [appContext.hideDriverCodeBar]);

  // if successfully read a bar code then display GSM modal
  // need to timed for display... probably due to setState
  const onBarCodeSuccess = value => {
    setTimeout(() => {
      setHideDriverBarCodeReader(true);
      setShowGSMInput(true);
    }, 500);
  };

  // if error on read show it
  const onBarCodeError = (value, cb) => {
    setTimeout(() => {
      const mesg = value.error || value;
      Alert.alert(
        'BIP Transport',
        mesg,
        [
          {
            text: 'Fermer',
            style: 'cancel',
            onPress: () => {
              setHideDriverBarCodeReader(false);
              setShowGSMInput(false);
              cb && cb();
            },
          },
        ],
        { cancelable: false },
      );
    }, 500);
  };

  // input get the text entered for future usage
  const onChangeInputGSM = text => setTempGsmNumber(text);

  // Ok change the GSM in the DB
  const onPressValidateGSM = () => {
    setShowGSMInput(false);
    setHideDriverBarCodeReader(true);
    appContext.setHideDriverBarCodeReader(true);
    appContext.setGSMNumber(tempGsmNumber);
    navigation.navigate(NAVS.driver.next);
  };

  const onPressCancelInputGSM = () => {
    setShowGSMInput(false);
    setHideDriverBarCodeReader(false);
    setTempGsmNumber('');
  };

  // Do nothing
  const onPressBackHome = () => {
    appContext.setHideCarBarCodeReader(false);
    navigation.navigate(NAVS.driver.previous);
  };

  return (
    <AppContext.Consumer>
      {({ driver, hideDriverCodeBar, getDriverDatas }) => (
        <>
          <CContent title="Code de tournée" fullscreen pressBackHome={onPressBackHome}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <CText style={{ textAlign: 'center', fontSize: (DEFAULT_FONT_SIZE * 3) / 4 }}>
                {`Scannez le code barre de votre tournée.`}
              </CText>
              <CSpace />
              <CBarCodeReader
                testID="ID_BARCODE"
                verificator={getDriverDatas}
                onSuccess={onBarCodeSuccess}
                onError={onBarCodeError}
                hide={hideDriverCodeBar}
              />
            </View>
          </CContent>
          {driver && (
            <Dialog.Container visible={showGSMInput} testID="ID_GSMCONFIRM">
              <Dialog.Title>{`${driver.firstname} ${driver.lastname}`}</Dialog.Title>
              <Dialog.Description>
                {`Veuillez confirmer votre numéro de portable (${
                  driver.gsm
                }) afin d'être joint par votre superviseur.`}
              </Dialog.Description>
              <Dialog.Input
                testID="ID_GSMCONFIRM_INPUT"
                defaultValue={driver.gsm}
                numberOfLines={1}
                onChangeText={onChangeInputGSM}
                wrapperStyle={{ borderBottomWidth: 1, borderBottomColor: COLORS.GREY }}
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
          )}
        </>
      )}
    </AppContext.Consumer>
  );
};

ScreenDriver.whyDidYouRender = true;

export default React.memo(ScreenDriver);
