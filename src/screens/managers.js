import React from 'react';
import { Alert, View, Linking } from 'react-native';
import { CSpace, CContent, CButton, CSpinner } from '@components';
import { Grid, Row, Col } from 'native-base';
import { AppContext } from '@contexts';
import { splashname } from '../../package';

/**
 * Le header et une liste de boutons permettant de joindre un manager
 */
const ScreenManagers = ({ navigation }) => {
  const onAcceptCall = manager => {
    const url = `tel:+33${manager.tel}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => Alert.alert(`An error occurred ${err}`));
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

  const onPressBackHome = () => {
    navigation.goBack();
  };

  const onPressClose = () => {
    navigation.goBack();
  };

  return (
    <CContent title="Vos responsables" fullscreen pressBackHome={onPressBackHome}>
      <AppContext.Consumer>
        {({ managerCollection }) => (
          <Grid style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Col style={{ flex: 1 }}>
              <Row>
                <Col style={{ flex: 1 }}>
                  {managerCollection.length > 0 &&
                    managerCollection.map(manager => (
                      <View key={manager.id}>
                        <CButton
                          testID={`ID_MANAGER_CALL_${manager.id}`}
                          light
                          full
                          label={manager.nom}
                          onPress={() => onPressManager(manager)}
                        />
                        <CSpace n={0.1} />
                      </View>
                    ))}
                  {managerCollection.length === 0 && (
                    <>
                      <CSpace n={2} />
                      <CSpinner />
                    </>
                  )}
                  <CSpace flex />
                </Col>
              </Row>
              <Row style={{ flex: 0 }}>
                <Col>
                  <CButton
                    full
                    label="Retour"
                    onPress={onPressClose}
                    testID="ID_MANAGERS_CLOSE_SCREEN"
                  />
                </Col>
              </Row>
            </Col>
          </Grid>
        )}
      </AppContext.Consumer>
    </CContent>
  );
};

export default ScreenManagers;
