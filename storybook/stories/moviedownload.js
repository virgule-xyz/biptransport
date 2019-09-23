import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CText, CButton, useMovieDownload } from '@components';
import { storiesOf } from '@storybook/react-native';

const MovieDownloadSentence = () => {
  const [start, setStart] = useState(false);
  const { index, percent, card, file, cancelDownload, startDownload } = useMovieDownload(start);

  doStartDownload = () => {
    setStart(true);
    startDownload();
  };

  doCancelDownload = () => {
    setStart(false);
    cancelDownload();
  };

  return (
    <>
      {!start && <CButton label="Charger" onPress={doStartDownload} />}
      {start && file === null && <CText>Loading...</CText>}
      {start && file && file.path === null && (
        <>
          <CText>
            Actually downloading file {file.url} to {file.name} ({index}/{card}) : {percent}%
          </CText>
          <CButton label="Arrêter" onPress={doCancelDownload} />
        </>
      )}
      {start && file && file.path !== null && (
        <CText>
          File {file.name} is downloaded in {file.path}
        </CText>
      )}
    </>
  );
};

const MovieDownload = () => {
  return <MovieDownloadSentence />;
};

storiesOf('Movie Download', module).add('default', () => <MovieDownload />);
