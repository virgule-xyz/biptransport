/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useContext, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import RNFetchBlob from 'rn-fetch-blob';
import { Dimensions, ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import { Grid, Row, Col } from 'native-base';
import { CModal, CImage, CSpace, CButton, CSep, AttachmentShape } from '@components';
import { AppContext } from '@contexts';
import ImageViewer from 'react-native-image-zoom-viewer';
import Video from 'react-native-video';

/**
 * Show the pictures of the waypoint, how to get there and other infos
 */
const ScreenWaypointGalery = ({ show, datas, videos, name, address, onClose }) => {
  const appContext = useContext(AppContext);
  const { height } = Dimensions.get('window');
  const [showZoomGalery, setShowZoomGalery] = useState({ show: false, index: -1, images: null });
  const [videoToPlay, setVideoToPlay] = useState(null);
  const [localPath, setLocalPath] = useState(() => {
    const { dirs } = RNFetchBlob.fs;
    return `${dirs.DocumentDir}/bip`;
  });

  const switchToZoom = useCallback(
    index => {
      setShowZoomGalery({
        show: true,
        index,
        images: datas.map(pict => ({
          url: pict.file,
          props: {},
        })),
      });
    },
    [datas, name],
  );

  const switchToGalery = useCallback(() => {
    setShowZoomGalery({
      show: false,
      index: 0,
      images: datas.map(pict => ({
        url: pict.file,
        props: {},
      })),
    });
  }, [datas, name]);

  const outer = useMemo(() => (
    <ImageViewer
      imageUrls={showZoomGalery.images}
      index={showZoomGalery.index}
      enableImageZoom
      onClick={switchToGalery}
    />
  ));

  const inner = useMemo(
    () =>
      datas &&
      datas.map((pict, index) => (
        <Row>
          <Col>
            <CSep />
            <TouchableOpacity
              onPress={() => {
                switchToZoom(index);
              }}
            >
              <CImage image={pict.file} width="100%" height={height * 0.33} resizeMode="contain" />
            </TouchableOpacity>
          </Col>
        </Row>
      )),
  );

  const doOnClose = useCallback(() => {
    switchToGalery();
    onClose();
  });

  const onPressVideoPlayer = useCallback(video => {
    setVideoToPlay(video.name);
  }, videos);

  const onPressVideo = useCallback(() => {
    setVideoToPlay(null);
  });

  const videosJsx = useMemo(() =>
    videos.map((video, index) => (
      <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
        <CButton
          label={`Afficher la vidéo ${index}`}
          onPress={() => {
            onPressVideoPlayer(video);
          }}
        />
      </Row>
    )),
  );

  return (
    <>
      {!videoToPlay && (
        <CModal onClose={doOnClose} show={show}>
          {showZoomGalery.show ? (
            outer
          ) : (
            <>
              <ScrollView>
                {videos && <Grid>{videosJsx}</Grid>}
                <Grid>{inner}</Grid>
              </ScrollView>
              <CSpace />
            </>
          )}
        </CModal>
      )}
      {videoToPlay && (
        <TouchableOpacity
          onPress={onPressVideo}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'black',
          }}
        >
          <Video
            repeat
            fullscreen
            fullscreenAutorotate
            fullscreenOrientation="landscape"
            resizeMode="contain"
            source={{ uri: `${localPath}/${videoToPlay}` }}
            style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

ScreenWaypointGalery.propTypes = {
  show: PropTypes.bool.isRequired,
  datas: PropTypes.arrayOf(AttachmentShape).isRequired,
  name: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.string).isRequired,
  address: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ScreenWaypointGalery;
