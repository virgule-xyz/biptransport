/**
 * Copyright (c) Netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useEffect, useContext } from 'react';
import { Alert, View } from 'react-native';
import { CInfo, CSpace, CWaypointTemplate, CButton, CError, CCamera, CImage } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from './index';
import { splashname } from '../../package.json';

/**
 * If you cannot scan an arrival you should take a picture and call your manager
 */
const ScreenWaypointCannotScanArrival = ({ navigation }) => {
  // manage the driver context
  const appContext = useContext(AppContext);

  const [hideCamera, setHideCamera] = useState(false);
  const [pictureTaken, setPictureTaken] = useState(null);

  useEffect(() => {
    appContext.loadFakeContext();
  }, []);

  const onPressCancel = () => {
    navigation.navigate(NAVS.wpcannotscanarrival.previous);
  };

  const onPressTakeAnotherPicture = () => {
    setPictureTaken(null);
    setHideCamera(false);
  };

  const onPressAcceptPicture = picture => {
    appContext
      .sendPictureToBeUnblocked(picture)
      .then(() => {
        // TODO: Supprimer les commentaires
        // navigation.navigate(NAVS.wpcannotscanarrival.next);
      })
      .catch(e => {
        Alert.alert(splashname, `Une erreur est survenue`, [
          {
            text: 'Ok',
            onPress: onPressTakeAnotherPicture,
          },
        ]);
      });
  };

  const onTakePicture = picture => {
    setPictureTaken(`data:image/jpg;base64,${picture}`);
    setHideCamera(true);
    Alert.alert(splashname, `Garder cette photo ?`, [
      {
        text: 'Oui',
        onPress: () => {
          onPressAcceptPicture(picture);
        },
      },
      {
        text: 'Non',
        style: 'cancel',
        onPress: onPressTakeAnotherPicture,
      },
    ]);
  };

  return (
    <AppContext.Consumer>
      {({ waypoint }) => (
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
          <View style={{ flex: 0, alignItems: 'center' }}>
            <CError style={{ textAlign: 'center' }}>
              Merci de prendre une photo avant de contacter votre responsable
            </CError>
            <CSpace />
            {(hideCamera && <CImage image={pictureTaken} width={320} height={240} />) || (
              <CCamera onTakePicture={onTakePicture} hide={hideCamera} />
            )}

            <CSpace />
            <CButton block icon="undo" label="Annuler" onPress={onPressCancel} />
          </View>
        </CWaypointTemplate>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointCannotScanArrival;
