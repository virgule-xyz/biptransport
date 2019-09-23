import React, { useState, useContext } from 'react';
import { withNavigation } from 'react-navigation';

import { CSpace, CContent, CText, useMovieDownload, CButton, CSpinner } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from '@screens';

/**
 * Should display a kind of progress of downlaoded videos
 */
const ScreenVideosDownload = ({ navigation }) => {
  // manage the context
  const appContext = useContext(AppContext);
  const [start, setStart] = useState(false);
  const { index, percent, card, duration, downloadEnd, startDownload } = useMovieDownload(start);

  // speed return to home
  const onPressBackHome = () => {
    appContext.setHideCarBarCodeReader(false);
    navigation.navigate(NAVS.videosdwn.previous);
  };

  // start the download
  const doStartDownload = () => {
    setStart(true);
    startDownload();
  };
  const doGoForward = () => {
    navigation.navigate(NAVS.videosdwn.next);
  };

  return (
    <CContent title="Téléchargement des vidéos" fullscreen pressBackHome={onPressBackHome}>
      {!downloadEnd && !start && (
        <>
          <CText style={{ textAlign: 'center' }}>
            Un certain nombre de vidéos doivent être téléchargées pour vous aider dans votre
            tournée.
          </CText>
          <CSpace />
          <CButton label="Télécharger" icon="arrow-down" block onPress={doStartDownload} />
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
          <CButton block label="Poursuirve" icon="check" onPress={doGoForward} />
        </>
      )}
    </CContent>
  );
};

export default withNavigation(ScreenVideosDownload);
