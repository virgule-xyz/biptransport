import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CText, CButton } from '@components';
import { storiesOf } from '@storybook/react-native';

import RNFetchBlob from 'rn-fetch-blob';

let stopDownloading = false;
let downloadingTask = null;

const useMovieDownload = (start = false) => {
  const [fileIndex, setFileIndex] = useState(null);
  const [fileCard, setFileCard] = useState(0);
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState(null);
  const [startDownloading, setStartDownloading] = useState(start);

  const { dirs } = RNFetchBlob.fs;
  const LOCAL_PATH = dirs.DocumentDir + '/bip';

  // Create the directory that will receive movies
  doCreateDownloadDir = async () => {
    try {
      const isDir = await RNFetchBlob.fs.isDir(LOCAL_PATH);
      if (!isDir) {
        await RNFetchBlob.fs.mkdir(LOCAL_PATH);
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  // Remove all the movie files from our directory
  doRemoveAllMovies = async () => {
    try {
      await RNFetchBlob.fs.unlink(LOCAL_PATH);
      return true;
    } catch (err) {
      return false;
    }
  };

  // stop the downloading task
  stopMovieDownload = task => {
    task.cancel();
    stopDownloading = true;
    setStartDownloading(false);
    setPercent(0);
    setFile(null);
  };

  // Download one file
  doDownloadMovie = (url, name) => {
    return new Promise((resolve, reject) => {
      if (url.length > 0 && name.length > 0 && !stopDownloading) {
        setFile({ name: name, path: null, url: url });

        downloadingTask = RNFetchBlob.config({
          fileCache: true,
          path: LOCAL_PATH + '/' + name,
        }).fetch('GET', url);

        downloadingTask
          .progress((received, total) => {
            if (stopDownloading) {
              stopMovieDownload(downloadingTask);
              reject();
            } else {
              total > 0 ? setPercent(Math.round((100 * received) / total)) : 0;
            }
          })
          .then(resp => {
            if (stopDownloading) {
              stopMovieDownload(downloadingTask);
              reject();
            } else {
              const path = resp.path();
              setPercent(100);
              setFile(prevFile => ({ ...prevFile, path: path }));
              resolve(path);
            }
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  };

  // Download filelist of movies to download
  doDownloadMovieList = () => {
    return new Promise((resolve, reject) => {
      const ret = [];
      for (let i = 0; i < 3; i++) {
        ret.push({
          url: 'http://ipv4.download.thinkbroadband.com/10MB.zip',
          name: 'test' + i + '.zip',
        });
      }
      resolve(ret);
    });
  };

  processDownloadOfMovies = listOfMovies => {
    const index = listOfMovies.length;
    if (index > 0 && !stopDownloading) {
      const [firstMovie, ...restOfMovies] = listOfMovies;
      const { url, name } = firstMovie;

      setFileIndex(index);
      doDownloadMovie(url, name)
        .then(path => {
          if (!stopDownloading) processDownloadOfMovies(restOfMovies);
        })
        .catch(err => {});
    }
  };

  cancelDownload = () => {
    stopDownloading = true;
    stopMovieDownload(downloadingTask);
    setStartDownloading(false);
  };

  startDownload = () => {
    stopDownloading = false;
    setStartDownloading(true);
  };

  useEffect(() => {
    // process the whole thing
    doDownloadMovies = async () => {
      const listOfMovies = await doDownloadMovieList();
      setFileCard(listOfMovies.length);
      await doRemoveAllMovies();
      await doCreateDownloadDir();
      !stopDownloading && processDownloadOfMovies(listOfMovies);
    };

    startDownloading && doDownloadMovies();
  }, [startDownloading]);

  return { index: fileIndex, percent, card: fileCard, file, cancelDownload, startDownload };
};

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
