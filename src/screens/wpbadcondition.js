/**
 * Copyright (c) bee2link, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Grid, Row, Col } from 'native-base';

import { CButton, CSpace, CWaypointTemplate, CError, CCamera } from '@components';
import { AppContext } from '@contexts';
import { splashname } from '../../package.json';

// Step one is to choose the reason not to go to the waypoint
const CStep1 = ({ conditionCollection, onPressCondition }) => (
  <>
    <CError>Impossible d'arriver sur ce point, merci d'indiquer la raison...</CError>
    <CSpace />
    <ScrollView>
      {conditionCollection.map(cond => (
        <>
          <CButton
            block
            warning
            label={cond.name}
            onPress={() => {
              onPressCondition(cond);
            }}
          />
          <CSpace n={0.1} />
        </>
      ))}
      <CSpace n={2} />
    </ScrollView>
  </>
);

// Step two take the picture
const CStep2 = ({ conditionState, onPressChangeCondition }) => (
  <View style={{ flex: 0, alignItems: 'center' }}>
    <CError style={{ textAlign: 'center' }}>
      Passage non traité pour raison de "{conditionState.name}" : prenez une photo du problème...
    </CError>
    <CSpace />
    <CCamera />
    <CSpace />
    <CButton block icon="undo" label="Changer de raison..." onPress={onPressChangeCondition} />
  </View>
);

// Step 3 ios to confirm the picture
const CStep3 = ({ conditionState, onPressTakeAnotherPicture, onPressValidatePicture }) => (
  <>
    <CError style={{ textAlign: 'center' }}>
      Passage non traité pour raison de "{conditionState.name}" : confirmez la photo...
    </CError>
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
        onPress={onPressValidatePicture}
      />
    </View>
    <CSpace />
  </>
);

/**
 * L'écran affiche les données du point de passage ainsi que les boutons d'action liés
 */
const ScreenWaypointBadCondition = ({ navigation }) => {
  // Driver context to get tour id
  const appContext = useContext(AppContext);

  // show the camera to take a picture
  const [showCameraState, setShowCameraState] = useState(false);

  // show the picture just taken
  const [showPictureTakenState, setShowPictureTakenState] = useState(false);

  // le locale selected condition
  const [conditionState, setConditionState] = useState(null);

  useEffect(() => {
    appContext.loadFakeContext();
  }, []);

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
            navigation.navigate('ScreenWaypointDashboard');
          },
        },
      ],
      { cancelable: false },
    );
  };

  const onPressChangeCondition = () => {
    setShowCameraState(false);
    setShowPictureTakenState(false);
    setConditionState(null);
  };

  const onPressCondition = cond => {
    setShowCameraState(true);
    // setShowPictureTakenState(true);
    setConditionState(cond);
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

  const onPressValidatePicture = () => {};

  return (
    <AppContext.Consumer>
      {({ waypoint, conditionCollection }) => (
        <CWaypointTemplate>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ flex: 0 }}>
              <CSpace />
              {!showCameraState && !showPictureTakenState && (
                <CStep1
                  conditionCollection={conditionCollection}
                  onPressCondition={onPressCondition}
                />
              )}
              {showCameraState && !showPictureTakenState && (
                <CStep2
                  conditionState={conditionState}
                  onPressChangeCondition={onPressChangeCondition}
                />
              )}
              {!showCameraState && showPictureTakenState && (
                <CStep3
                  conditionState={conditionState}
                  onPressTakeAnotherPicture={onPressTakeAnotherPicture}
                  onPressValidatePicture={onPressValidatePicture}
                />
              )}
            </View>

            <View style={{ flex: 0 }}>
              <CSpace />
              <CButton onPress={onPressQuitScreen} block danger icon="close-o" label="Annuler" />
            </View>
          </View>
        </CWaypointTemplate>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointBadCondition;
