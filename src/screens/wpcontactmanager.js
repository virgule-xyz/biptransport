/**
 * Copyright (c) Netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useEffect, useContext } from 'react';
import { Alert, View, Linking } from 'react-native';
import { Icon } from 'native-base';
import { NAVS } from './index';
import { splashname } from '../../package.json';
import {
  CInfo,
  CSpace,
  CWaypointTemplate,
  CButton,
  CSpinner,
  CInput,
  CError,
  ICON_TYPE,
} from '@components';
import { AppContext } from '@contexts';

/**
 * Input plus contact your manager
 */
const ScreenWaypointContactManager = ({ navigation }) => {
  const appContext = useContext(AppContext);

  const [screenState, setScreenState] = useState({
    codeEntered: null,
    isCalling: false,
    isError: false,
    outTimeout: null,
  });

  const onAcceptCall = manager => {
    const url = `tel:+33${manager.tel}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert(splashname, `Impossible d'utiliser: ${url}`);
        } else {
          setScreenState(state => ({ ...state, isCalling: true }));
          return Linking.openURL(url);
        }
      })
      .catch(err => Alert.alert(splashname, `Erreur : ${err}`));
  };

  const onPressManager = manager => {
    Alert.alert(
      splashname,
      `Voulez-vous appeler le ${manager.tel} ?`,
      [
        { text: 'Oui', onPress: () => onAcceptCall(manager) },
        {
          text: 'Non',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  const onChangeCode = text => {
    const correctCode = appContext.codeToUnlock && appContext.codeToUnlock.toLowerCase();
    console.warn('Correct code', appContext.codeToUnlock);
    setScreenState(state => ({
      ...state,
      codeEntered: text.length > 0,
      isError: text.toLowerCase() !== correctCode,
    }));
  };

  const onPressCancel = () => {
    navigation.navigate(NAVS.wpcontactmanager.previous);
  };

  useEffect(() => {
    appContext.loadFakeContext();
  }, []);

  useEffect(() => {
    if (screenState.codeEntered && !screenState.isError) {
      const timeout = setTimeout(() => {
        navigation.navigate(NAVS.wpcontactmanager.next);
      }, 500);
      setScreenState(state => ({
        ...state,
        outTimeout: timeout,
      }));
    }

    return () => {
      clearTimeout(screenState.outTimeout);
    };
  }, [screenState.isError]);

  return (
    <AppContext.Consumer>
      {({ waypoint, managerCollection }) => (
        <CWaypointTemplate
          small
          noAddress
          greyContent={
            <View>
              <CInfo>
                Impossible de scanner le code barre
                {waypoint.waypointCodes.length > 1
                  ? `${waypoint.waypointCodeIndex + 1}/${waypoint.waypointCodes.length} `
                  : ` `}
                du point de passage...
              </CInfo>
            </View>
          }
        >
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <CError style={{ textAlign: 'center' }}>
              {`Merci de contacter votre responsable \nafin de récupérer le code de déblocage.`}
            </CError>
            <CSpace />
            {managerCollection.length > 0 &&
              managerCollection.map(manager => (
                <>
                  <CButton
                    testID={`ID_MANAGER_CALL_${manager.id}`}
                    light
                    full
                    style={{ width: '100%' }}
                    label={manager.nom}
                    onPress={() => onPressManager(manager)}
                  />
                  <CSpace n={0.1} />
                </>
              ))}
            {managerCollection.length === 0 && (
              <>
                <CSpace n={2} />
                <CSpinner />
              </>
            )}
            {(screenState.isCalling || true) && (
              <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                {screenState.codeEntered && (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <CSpace n={0.5} />
                    {!screenState.isError && (
                      <Icon name="check" type={ICON_TYPE} style={{ color: '#0a0', fontSize: 60 }} />
                    )}
                    {screenState.isError && (
                      <Icon
                        name="close-o"
                        type={ICON_TYPE}
                        style={{ color: '#f00', fontSize: 60 }}
                      />
                    )}
                  </View>
                )}
                <CSpace />
                <CInput label="Le code" onChange={onChangeCode} />
              </View>
            )}
            <CSpace />
            <CButton block icon="undo" label="Annuler" onPress={onPressCancel} />
          </View>
        </CWaypointTemplate>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointContactManager;
