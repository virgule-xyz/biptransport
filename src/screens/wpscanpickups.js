/**
 * Copyright (c) Netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { Picker, Icon } from 'native-base';
import {
  CInfo,
  CError,
  CSpace,
  CText,
  CWaypointTemplate,
  CSep,
  CButton,
  COLORS,
} from '@components';
import { AppContext } from '@contexts';
import { NAVS } from './index';

/**
 *
 */
const ScreenWaypointScanPickups = ({ navigation }) => {
  // manage the  context
  const appContext = useContext(AppContext);

  const PICKER_DEFAULT = -1;

  const [pickerValueState, setPickerValueState] = useState(PICKER_DEFAULT);
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    if (pickerValueState > PICKER_DEFAULT) {
      if (pickerValueState !== 10 && pickerValueState < appContext.waypoint.pickupCount) {
        setErrorState('Attention, vous allez devoir prendre une photo...');
      } else {
        setErrorState(false);
      }
    }
  }, [pickerValueState]);

  useEffect(() => {
    appContext.doLoadFakeContext();
  }, []);

  const onPressContinue = () => {
    appContext.setPickupCount(pickerValueState);
    if (errorState === false) {
      navigation.navigate(NAVS.wpscanpickups.next);
    } else {
      navigation.navigate(NAVS.wpscanpickupsphotos.current);
    }
  };

  return (
    <AppContext.Consumer>
      {({ waypoint }) => (
        <CWaypointTemplate
          small
          noAddress
          greyContent={
            <View>
              <CInfo>Vous devez récupérer {waypoint.pickupCount} colis</CInfo>
            </View>
          }
        >
          <CSpace />
          <View style={{ flex: 0 }}>
            <CText>Combien de colis voyez vous ?</CText>
            <CSpace />
            <View
              style={{
                backgroundColor: COLORS.GREY,
                color: COLORS.BLACK,
                borderRadius: 3,
                width: '90%',
              }}
            >
              <Picker
                testID="ID_PICKER"
                mode="dropdown"
                iosHeader="Combien ?"
                headerBackButtonText="Fermer"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder={<CText>Choisissez un nombre</CText>}
                placeholderStyle={{ color: COLORS.BLACK }}
                textStyle={{ color: COLORS.BLACK }}
                selectedValue={pickerValueState}
                onValueChange={setPickerValueState}
              >
                <Picker.Item label="Il y a 0 colis" value="0" />
                <Picker.Item label="Il y a 1 colis" value="1" />
                <Picker.Item label="Il y a 2 colis" value="2" />
                <Picker.Item label="Il y a 3 colis" value="3" />
                <Picker.Item label="Il y a 4 colis" value="4" />
                <Picker.Item label="Il y a 5 colis" value="5" />
                <Picker.Item label="Il y a 6 colis" value="6" />
                <Picker.Item label="Il y a 7 colis" value="7" />
                <Picker.Item label="Il y a 8 colis" value="8" />
                <Picker.Item label="Il y a 9 colis" value="9" />
                <Picker.Item label="Il y a 10 colis ou +" value="10" />
              </Picker>
            </View>
            {errorState && (
              <>
                <CSpace />
                <CError>{errorState}</CError>
              </>
            )}
          </View>
          <CSpace flex />
          <CButton
            testID="ID_BUTTON_PICKUP_VALIDATE"
            icon="check"
            style={{ backgroundColor: COLORS.PRIMARY }}
            block
            label="Valider"
            danger={errorState}
            primary={!errorState}
            disabled={pickerValueState === PICKER_DEFAULT && appContext.waypoint.pickupCount > 0}
            onPress={onPressContinue}
          />
        </CWaypointTemplate>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointScanPickups;
