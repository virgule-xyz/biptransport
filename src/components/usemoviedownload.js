import React, { useState, useEffect, useCallback, useMemo } from 'react';

import RNFetchBlob from 'rn-fetch-blob';

let stopDownloading = false;
let downloadingTask = null;

// listOfMovies = {url:string,name:string}[]

const useMovieDownload = (listOfMovies = [], start = false) => {
  const [fileIndex, setFileIndex] = useState(null);
  const [percent, setPercent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [file, setFile] = useState(null);
  const [downloadEnd, setDownloadEnd] = useState(false);
  const [startDownloading, setStartDownloading] = useState(start);
  const [startClock, setStartClock] = useState(null);

  const fileCard = listOfMovies.length;

  const { dirs } = RNFetchBlob.fs;
  const LOCAL_PATH = `${dirs.DocumentDir}/bip`;

  // Create the directory that will receive movies
  const doCreateDownloadDir = async () => {
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
  const doRemoveAllMovies = async () => {
    try {
      await RNFetchBlob.fs.unlink(LOCAL_PATH);
      return true;
    } catch (err) {
      return false;
    }
  };

  // stop the downloading task
  const stopMovieDownload = task => {
    task.cancel();
    stopDownloading = true;
    setStartDownloading(false);
    setPercent(0);
    setFile(null);
  };

  // Download one file
  const doDownloadMovie = (url, name) => {
    return new Promise((resolve, reject) => {
      if (url.length > 0 && name.length > 0 && !stopDownloading) {
        setFile({ name, path: null, url });

        downloadingTask = RNFetchBlob.config({
          fileCache: true,
          path: `${LOCAL_PATH}/${name}`,
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
              const apath = resp.path();
              setPercent(100);
              setFile(prevFile => ({ ...prevFile, apath }));
              resolve(apath);
            }
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  };

  // Download filelist of movies to download
  const doDownloadMovieList = () => {
    return new Promise((resolve, reject) => {
      const ret = [];
      for (let i = 0; i < 9; i++) {
        ret.push({
          url: 'http://ipv4.download.thinkbroadband.com/1MB.zip',
          name: `test${i}.zip`,
        });
      }
      resolve(ret);
    });
  };

  const processDownloadOfMovies = (listOfMovies, callback) => {
    const index = listOfMovies.length;

    if (index > 0 && !stopDownloading) {
      const [firstMovie, ...restOfMovies] = listOfMovies;
      const { url, name } = firstMovie;

      setFileIndex(index);
      doDownloadMovie(url, name)
        .then(apath => {
          if (!stopDownloading) processDownloadOfMovies(restOfMovies);
        })
        .catch(err => {});
    } else {
      setDownloadEnd(true);
    }
  };

  const cancelDownload = () => {
    stopDownloading = true;
    stopMovieDownload(downloadingTask);
    setStartDownloading(false);
  };

  const startDownload = () => {
    stopDownloading = false;
    setStartDownloading(true);
  };

  useEffect(() => {
    // process the whole thing
    const doDownloadMovies = async () => {
      await doRemoveAllMovies();
      await doCreateDownloadDir();
      setStartClock(Date.now());
      if (!stopDownloading) processDownloadOfMovies(listOfMovies);
    };

    if (startDownloading) doDownloadMovies();
  }, [startDownloading]);

  useEffect(() => {
    if (stopDownloading) {
      setStartClock(0);
      setDuration(0);
    }
  }, [stopDownloading]);

  const toMinutes = t => {
    let s = 0;
    let m = 0;
    let h = 0;
    let rest = t;
    if (rest > 3600) {
      h = Math.floor(rest / 3600);
      rest -= h * 3600;
    }
    if (rest > 60) {
      m = Math.floor(rest / 60);
      rest -= m * 60;
    }
    s = rest;
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    const getNewDuration = () => {
      if (fileCard - fileIndex > 0) {
        const elapsedTime = (Date.now() - startClock) / 1000;
        const videosToDownload = fileIndex;
        const videosDownloaded = fileCard - fileIndex;
        const average = Math.floor((videosToDownload * elapsedTime) / videosDownloaded);
        return toMinutes(average);
      }
      return 0;
    };
    setDuration(getNewDuration());
  }, [fileIndex]);

  return {
    index: fileIndex,
    percent,
    card: fileCard,
    file,
    duration,
    downloadEnd,
    cancelDownload,
    startDownload,
  };
};

export default useMovieDownload;
