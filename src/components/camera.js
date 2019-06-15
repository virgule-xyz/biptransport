/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
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
const CCamera = ({ onTakePicture, testID, ...props }) => {
  const { width } = Dimensions.get('window');
  const SCREEN_REPORT = width / BASE_WIDTH;
  const W = width * REPORT * SCREEN_REPORT;
  const H = W / PICTURE_REPORT;

  // Ok we press the UI button to take the picture
  const onPressCameraButton = async camera => {
    const options = {
      quality: 0.5,
      base64: true,
      doNotSave: true,
      width: PICTURE_WIDTH,
      exif: true,
    };
    const data = await camera.takePictureAsync(options);
    onTakePicture(data.base64);
  };

  return (
    <View>
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
    >
      {({ camera, status }) => {
        if (status !== 'READY')
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
        return (
          <View
            style={{
              width: W,
              height: H,
              position: 'relative',
            }}
          >
            <TouchableOpacity
              testID={`${testID}_BUTTON`}
              icon="camera"
              label=" "
              onPress={() => onPressCameraButton(camera)}
              style={{
                position: 'absolute',
                bottom: 20 * SCREEN_REPORT,
                right: 20 * SCREEN_REPORT,
                width: 60 * SCREEN_REPORT,
                height: 60 * SCREEN_REPORT,
                borderRadius: 200 * SCREEN_REPORT,
                overflow: 'hidden',
                zIndex: 9,
              }}
            >
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Icon name="camera" type={ICON_TYPE} color="#fff" />
              </View>
            </TouchableOpacity>
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
          </View>
        );
      }}
    </RNCamera></View>
  );
};

CCamera.propTypes = {
  onTakePicture: PropTypes.func.isRequired,
};

// CCamera.defaultProps = {};

export default CCamera;
