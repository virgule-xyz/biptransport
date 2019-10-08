/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useEffect } from 'react';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import {
  CSpinner,
  COLORS,
  ICON_TYPE,
  PICTURE_REPORT,
  PICTURE_WIDTH,
  BASE_WIDTH,
} from '@components';
import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';

const REPORT = 0.9;

/**
 * Launch the camera
 */
const CCamera = ({ onTakePicture, hide, testID, ...props }) => {
  const [stopCamera, setStopCamera] = useState(false);
  const [startRecording, setStartRecording] = useState(false);
  const [stopRecording, setStopRecording] = useState(false);

  const { width } = Dimensions.get('window');
  const SCREEN_REPORT = width / BASE_WIDTH;
  const W = width * REPORT * SCREEN_REPORT;
  const H = W / PICTURE_REPORT;

  const CPictureButton = ({ onPress }) => (
    <TouchableOpacity
      testID={`${testID}_BUTTON`}
      icon="camera"
      label=" "
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: 20 * SCREEN_REPORT,
        right: 20 * SCREEN_REPORT,
        width: 44 * SCREEN_REPORT,
        height: 44 * SCREEN_REPORT,
        borderRadius: 200 * SCREEN_REPORT,
        overflow: 'hidden',
        zIndex: 9,
      }}
    >
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Icon name="camera" type={ICON_TYPE} color="#fff" />
      </View>
    </TouchableOpacity>
  );

  const CCameraButton = ({ onPress }) => (
    <TouchableOpacity
      testID={`${testID}_BUTTON`}
      icon="camera"
      label=" "
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: 20 * SCREEN_REPORT,
        right: 20 * SCREEN_REPORT + 44 * SCREEN_REPORT + 20,
        width: 44 * SCREEN_REPORT,
        height: 44 * SCREEN_REPORT,
        borderRadius: 200 * SCREEN_REPORT,
        overflow: 'hidden',
        zIndex: 9,
      }}
    >
      {!stopRecording && (
        <View
          style={{
            backgroundColor: 'rgba(255,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {startRecording && <Icon name="close" type={ICON_TYPE} color="#fff" />}
        </View>
      )}
      {stopRecording && (
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <CSpinner />
        </View>
      )}
    </TouchableOpacity>
  );

  const CameraGrid = () => (
    <>
      <View
        style={{
          width: 1,
          height: H,
          borderWidth: 1,
          borderColor: COLORS.DANGER,
          position: 'absolute',
          top: 0,
          left: W / 2,
        }}
      />
      <View
        style={{
          width: W,
          height: 1,
          borderWidth: 1,
          borderColor: COLORS.DANGER,
          position: 'absolute',
          top: H / 2,
          left: 0,
        }}
      />
      <View
        style={{
          width: W - 20 * SCREEN_REPORT,
          height: H - 20 * SCREEN_REPORT,
          borderWidth: 1,
          borderColor: COLORS.DANGER,
          position: 'absolute',
          top: 10 * SCREEN_REPORT,
          left: 10 * SCREEN_REPORT,
        }}
      />
    </>
  );

  const onPressCameraButton = async camera => {
    const RECORD_OPTIONS = {
      maxDuration: 60,
      mirrorVideo: false,
    };
    if (!startRecording && !stopRecording) {
      setStartRecording(true);
      const { uri, codec = 'mp4' } = await camera.recordAsync();
    } else if (startRecording && !stopRecording) {
      setStopRecording(true);
      await camera.stopRecording();
      setStopRecording(false);
      setStartRecording(false);
    }
  };

  // Ok we press the UI button to take the picture
  const onPressPictureButton = async camera => {
    const options = {
      quality: 0.5,
      base64: true,
      doNotSave: true,
      width: PICTURE_WIDTH,
      exif: true,
      fixOrientation: true,
      pauseAfterCapture: true,
      orientation: 'portrait',
    };
    try {
      const data = await camera.takePictureAsync(options);
      setStopCamera(true);
      onTakePicture(data.base64);
    } catch (e) {
      setStopCamera(true);
    }
  };

  // should stop the camera to allow alert display
  useEffect(() => {
    const useEffectAsync = async v => {
      setStopCamera(v);
    };
    useEffectAsync(hide);
    console.warn('CHANGE');
  }, [hide]);

  return (
    <View>
      {!hide && (
        <RNCamera
          captureAudio={false}
          style={[
            {
              height: H,
              width: W,
              overflow: 'hidden',
              flex: 0,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.outo}
        >
          {({ camera, status }) => {
            if (status !== 'READY' || stopCamera)
              return (
                <View
                  style={{
                    width: W,
                    height: H,
                  }}
                >
                  <CSpinner />
                </View>
              );
            if (stopCamera) {
              camera.pausePreview();
            } else {
              camera.resumePreview();
            }
            return (
              <View
                style={{
                  width: W,
                  height: H,
                  position: 'relative',
                }}
              >
                <CCameraButton onPress={() => onPressCameraButton(camera)} />
                <CPictureButton onPress={() => onPressPictureButton(camera)} />
                <CameraGrid />
              </View>
            );
          }}
        </RNCamera>
      )}
    </View>
  );
};

CCamera.propTypes = {
  onTakePicture: PropTypes.func.isRequired,
};

// CCamera.defaultProps = {};

export default CCamera;
