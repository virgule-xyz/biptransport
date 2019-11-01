import React, { useState, useMemo, useContext } from 'react';
import { withNavigation } from 'react-navigation';

import { CSpace, CContent, CText, useMovieDownload, CButton, CSpinner } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from '@screens';

/**
 * Should display all the delivery packages code to scan before going in the course
 */
const ScreenDeliveryScans = ({ navigation }) => {
  // manage the context
  const appContext = useContext(AppContext);

  // speed return to home
  const onPressBackHome = () => {
    navigation.navigate(NAVS.deliveryscans.previous);
  };

  const doGoForward = () => {
    navigation.navigate(NAVS.deliveryscans.next);
  };

  return (
    <CContent title="Vérifications des colis" fullscreen pressBackHome={onPressBackHome}>
      <CText>Hello</CText>
    </CContent>
  );
};

export default withNavigation(ScreenDeliveryScans);
