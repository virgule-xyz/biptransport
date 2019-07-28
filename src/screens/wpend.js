/**
 * Copyright (c) bee2link, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { CSpace, CButton, CContent, CTitle } from '@components';
import RNExitApp from 'react-native-exit-app';

/**
 * Expliquer ce qu'affiche et permet de faire l'écran
 */
const ScreenWaypointEnd = () => {
  const onPressTerminate = () => {
    RNExitApp.exitApp();
  };

  return (
    <CContent fullscreen center>
      <CSpace />
      <CTitle>Merci, votre tournée est terminée !</CTitle>
      <CSpace />
      <CButton testID="ID_TERMINATE" block label="Terminer" onPress={onPressTerminate} />
      <CSpace />
    </CContent>
  );
};

export default ScreenWaypointEnd;
