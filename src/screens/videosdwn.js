import React, { useState, useMemo, useContext, useCallback } from 'react';
import { withNavigation } from 'react-navigation';
import { Grid, Row, Col } from 'native-base';
import { CSpace, CContent, CText, useMovieDownload, CButton, CSpinner } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from '@screens';

/**
 * Should display a kind of progress of downlaoded videos
 */
const ScreenVideosDownload = ({ navigation }) => {
  // manage the context
  const appContext = useContext(AppContext);
  const coll = useMemo(() => appContext.getVideosToDownload(), []);
  const [start, setStart] = useState(false);

  const { index, percent, card, duration, downloadEnd, startDownload } = useMovieDownload(
    coll,
    start,
  );

  // speed return to home
  const onPressBackHome = useCallback(() => {
    appContext.setHideCarBarCodeReader(false);
    navigation.navigate(NAVS.videosdwn.previous);
  }, []);

  // start the download
  const onPressStart = useCallback(() => {
    setStart(true);
    startDownload();
  }, []);

  // Normal go forward, with videos cached
  const onPressContinue = useCallback(() => {
    appContext.setVideosCache(coll);
    navigation.navigate(NAVS.videosdwn.next);
  }, []);

  // Force, no download
  const onPressWithout = useCallback(() => {
    navigation.navigate(NAVS.videosdwn.next);
  }, []);

  return (
    <CContent title="Téléchargement des vidéos" fullscreen pressBackHome={onPressBackHome}>
      {!downloadEnd && !start && (
        <>
          <CText style={{ textAlign: 'center' }}>
            {card} vidéos peuvent être téléchargées pour vous aider dans votre tournée. Voulez-vous
            les télécharger ?
          </CText>
          <CSpace />
          <Grid style={{ flex: 0 }}>
            <Col size={4}>
              <CButton label="Oui" block icon="check" onPress={onPressStart} />
            </Col>
            <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <CText>Ou</CText>
            </Col>
            <Col size={4}>
              <CButton label="Non" block icon="close-o" onPress={onPressWithout} />
            </Col>
          </Grid>
        </>
      )}
      {!downloadEnd && start && (
        <>
          <CText style={{ textAlign: 'center' }}>
            Veuillez ne pas quitter l'application avant la fin du téléchargement des vidéos
          </CText>
          <CSpace />
          <CSpinner color="#666666" />
          <CText>{duration}</CText>
          <CText style={{ textAlign: 'center' }}>
            Vidéo {index} sur {card}
          </CText>

          <CText style={{ textAlign: 'center' }}>{percent}% téléchargé</CText>
        </>
      )}
      {downloadEnd && (
        <>
          <CText>Téléchargement terminé</CText>
          <CSpace />
          <CButton block label="Poursuivre" icon="check" onPress={onPressContinue} />
        </>
      )}
    </CContent>
  );
};

export default withNavigation(ScreenVideosDownload);
