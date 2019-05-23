import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { RNCamera } from 'react-native-camera';
import { CButton, CSpinner, COLORS } from '@components';
import { ICON_TYPE, ICON_COLOR } from './icon';

const RAPPORT = 4 / 5;

/**
 * Launch the camera
 */
const CCamera = () => {
  const { width } = Dimensions.get('window');
  const W = width * 0.9;
  const H = (width * RAPPORT * 3) / 4;
  return (
    <RNCamera
      captureAudio={false}
      style={[
        {
          height: H,
          width: W,
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
              icon="camera"
              label=" "
              onPress={() => {}}
              style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                width: 60,
                height: 60,
                borderRadius: 200,
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
                width: W - 20,
                height: H - 20,
                borderWidth: 1,
                borderColor: COLORS.DANGER,
                position: 'absolute',
                top: 10,
                left: 10,
              }}
            />
          </View>
        );
      }}
    </RNCamera>
  );
};

// CCamera.propTypes = {};

// CCamera.defaultProps = {};

export default CCamera;