/**
 * Copyright (c) Netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useContext, useEffect } from 'react';
import { View, Alert, Dimensions } from 'react-native';

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

  // is ti a video
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    appContext.doLoadFakeContext();
    const { width, height } = Dimensions.get('window');
    setScreenSizeState({ width, height });
  }, []);

  // Step one take the picture
  const onTakePicture = picture => {
    setIsVideo(false);
    setBase64PictureState(picture);
    setShowCameraState(false);
    setShowPictureTakenState(true);
  };

  // Or a video
  const onRecord = ({ uri, codec = 'mp4' }) => {
    setIsVideo(true);
    setBase64PictureState(uri);
    setShowCameraState(false);
    setShowPictureTakenState(true);
  };

  const CStep1 = () => (
    <View style={{ flex: 0, alignItems: 'center' }}>
      <CError style={{ textAlign: 'center' }}>Prenez une photo/vidéo des colis...</CError>
      <CSpace />
      <CCamera onTakePicture={onTakePicture} onRecord={onRecord} testID="ID_TOUR_CAMERA" />
      <CSpace />
      {/* <CButton block icon="undo" label="Changer de raison..." onPress={onPressChangeCondition} /> */}
    </View>
  );

  // Step 2 ios to confirm the picture
  const CStep2 = ({ onPressTakeAnotherPicture, onPressValidatePicture }) => (
    <>
      <CError style={{ textAlign: 'center' }}>Confirmez la photo/vidéo...</CError>
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
          {isVideo ? (
            <CImage
              image="data:image/png;base64,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"
              width={screenSizeState.width * 0.9}
              height={240}
            />
          ) : (
            <CImage
              image={`data:image/jpg;base64,${base64PictureState}`}
              width={screenSizeState.width * 0.9}
              height={240}
            />
          )}
        </View>
      )}
      <CSpace n={0.5} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CButton
          small
          style={{ width: '45%' }}
          icon="undo"
          danger
          label="Reprendre"
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
      'Êtes-vous sûr de vouloir quitter cet écran ? (les photos/vidéos prises seront perdues...)',
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
      'ATTENTION !\nLa photo/vidéo actuelle ne sera pas gardée !',
      [
        { text: 'Garder', onPress: () => {} },
        {
          text: 'Recommencer',
          onPress: () => {
            setIsVideo(false);
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
    appContext.setStorePickupPicture(base64PictureState, isVideo);
    navigation.navigate(NAVS.wpscanpickupsphotos.next);
  };

  return (
    <AppContext.Consumer>
      {({ waypoint, conditionCollection }) => (
        <CWaypointTemplate small noAddress>
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
