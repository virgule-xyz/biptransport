/**
 * Copyright (c) bee2link, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Alert, Dimensions } from 'react-native';

import { CButton, CSpace, CWaypointTemplate, CError, CCamera, CImage } from '@components';
import { AppContext } from '@contexts';
import { splashname } from '../../package.json';
import { NAVS } from './index';
/**
 * L'écran affiche les données du point de passage ainsi que les boutons d'action liés
 */
const ScreenWaypointScanPickupsPhotos = ({ navigation }) => {
  // Driver context to get tour id
  const appContext = useContext(AppContext);

  // Dimensions of screen
  const [screenSizeState, setScreenSizeState] = useState({ width: 0, height: 0 });

  // show the camera to take a picture
  const [showCameraState, setShowCameraState] = useState(true);

  // show the picture just taken
  const [showPictureTakenState, setShowPictureTakenState] = useState(false);

  // the picture data
  const [base64PictureState, setBase64PictureState] = useState(null);

  useEffect(() => {
    appContext.loadFakeContext();
    const { width, height } = Dimensions.get('window');
    setScreenSizeState({ width, height });
  }, []);

  // Step one take the picture
  const onTakePicture = picture => {
    setBase64PictureState(picture);
    setShowCameraState(false);
    setShowPictureTakenState(true);
  };

  const CStep1 = () => (
    <View style={{ flex: 0, alignItems: 'center' }}>
      <CError style={{ textAlign: 'center' }}>Prenez une photo des colis...</CError>
      <CSpace />
      <CCamera onTakePicture={onTakePicture} testID="ID_TOUR_CAMERA" />
      <CSpace />
      {/* <CButton block icon="undo" label="Changer de raison..." onPress={onPressChangeCondition} /> */}
    </View>
  );

  // Step 2 ios to confirm the picture
  const CStep2 = ({ onPressTakeAnotherPicture, onPressValidatePicture }) => (
    <>
      <CError style={{ textAlign: 'center' }}>Confirmez la photo...</CError>
      <CSpace n={0.5} />
      {base64PictureState && (
        <View
          style={{
            flex: 0,
            width: '100%',
            height: 240,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CImage
            image={`data:image/jpg;base64,${base64PictureState}`}
            width={screenSizeState.width * 0.9}
            height={240}
          />
        </View>
      )}
      <CSpace n={0.5} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CButton
          small
          style={{ width: '45%' }}
          icon="undo"
          danger
          label="Reprendre la photo"
          onPress={onPressTakeAnotherPicture}
        />
        <CButton
          small
          style={{ width: '45%' }}
          icon="check"
          label="Confirmer"
          testID="ID_TOUR_CAMERA_CONFIRM"
          onPress={onPressValidatePicture}
        />
      </View>
      <CSpace />
    </>
  );

  const onPressQuitScreen = () => {
    Alert.alert(
      splashname,
      'Êtes-vous sûr de vouloir quitter cet écran ? (les photos prises seront perdues...)',
      [
        {
          text: 'Rester ici',
        },
        {
          text: "Quitter l'écran",
          style: 'cancel',
          onPress: () => {
            navigation.navigate(NAVS.wpscanpickupsphotos.previous);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const onPressTakeAnotherPicture = () => {
    Alert.alert(
      splashname,
      'ATTENTION !\nLa photo actuelle ne sera pas gardée !',
      [
        { text: 'Garder la photo', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Recommencer la photo',
          onPress: () => {
            setShowCameraState(true);
            setShowPictureTakenState(false);
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  const onPressValidatePicture = () => {
    // appContext.storeClue({
    //   condition: conditionState,
    //   picture: base64PictureState,
    // });
    navigation.navigate(NAVS.wpscanpickupsphotos.next);
  };

  return (
    <AppContext.Consumer>
      {({ waypoint, conditionCollection }) => (
        <CWaypointTemplate>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ flex: 0 }}>
              <CSpace />
              {showCameraState && !showPictureTakenState && <CStep1 />}
              {!showCameraState && showPictureTakenState && (
                <CStep2
                  onPressTakeAnotherPicture={onPressTakeAnotherPicture}
                  onPressValidatePicture={onPressValidatePicture}
                />
              )}
            </View>

            <View style={{ flex: 0 }}>
              <CSpace />
              <CButton
                onPress={onPressQuitScreen}
                block
                danger
                icon="close-o"
                label="Annuler"
                testID="ID_BADCONDITIONS_CANCEL"
              />
            </View>
          </View>
        </CWaypointTemplate>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointScanPickupsPhotos;
