/**
 * Copyright (c) bee2link, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import {
  CButton,
  CText,
  CSpace,
  CSep,
  CWaypointButtons,
  CWaypointCounters,
  CWaypointTemplate,
  CError,
} from '@components';
import { AppContext } from '@contexts';
import ScreenWaypointCollection from './wpcollection';
import ScreenWaypointGalery from './wpgalery';

/**
 * L'écran affiche les données du point de passage ainsi que les boutons d'action liés
 */
const ScreenWaypointBadCondition = ({ navigation }) => {
  // Driver context to get tour id
  const appContext = useContext(AppContext);

  useEffect(() => {
    appContext.loadFakeContext();
  }, []);

  const onPressCondition = cond => {
    appContext.saveCondition(cond);
  };

  return (
    <AppContext.Consumer>
      {({ waypoint, conditionCollection, waypointList }) => (
        <CWaypointTemplate>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <CSpace />
              <CError>Impossible d'arriver sur ce point</CError>
              <CSpace />
              <CText style={{ textAlign: 'center' }}>Choisissez ci-dessous la raison...</CText>
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
            </View>

            <View style={{ flex: 0 }}>
              <CSpace />
              <CButton
                onPress={() => {
                  navigation.navigate('ScreenWaypointDashboard');
                }}
                block
                danger
                label="Annuler"
              />
            </View>
          </View>
        </CWaypointTemplate>
      )}
    </AppContext.Consumer>
  );
};

export default ScreenWaypointBadCondition;
