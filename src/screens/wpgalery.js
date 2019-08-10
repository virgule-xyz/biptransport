/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Grid, Row, Col } from 'native-base';
import {
  CGreyBox,
  CModal,
  CImage,
  CSpace,
  CTitle,
  CSep,
  CWaypointAddress,
  AttachmentShape,
} from '@components';
import ImageViewer from 'react-native-image-zoom-viewer';

/**
 * Show the pictures of the waypoint, how to get there and other infos
 */
const ScreenWaypointGalery = ({ show, datas, name, address, onClose }) => {
  const { height } = Dimensions.get('window');
  const [showZoomGalery, setShowZoomGalery] = useState({ show: false, index: -1, images: null });

  const switchToZoom = index => {
    setShowZoomGalery({
      show: true,
      index,
      images: datas.map(pict => ({
        url: pict.file,
        props: {},
      })),
    });
  };

  const switchToGalery = () => {
    setShowZoomGalery({
      show: false,
      index: 0,
      images: datas.map(pict => ({
        url: pict.file,
        props: {},
      })),
    });
  };

  return (
    <CModal onClose={onClose} show={show}>
      {showZoomGalery.show ? (
        <ImageViewer
          imageUrls={showZoomGalery.images}
          index={showZoomGalery.index}
          enableImageZoom
          onClick={switchToGalery}
        />
      ) : (
        <>
          <ScrollView>
            <Grid>
              {datas &&
                datas.map((pict, index) => (
                  <Row>
                    <Col>
                      <CSep />
                      <TouchableOpacity
                        onPress={() => {
                          switchToZoom(index);
                        }}
                      >
                        <CImage
                          image={pict.file}
                          width="100%"
                          height={height * 0.33}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </Col>
                  </Row>
                ))}
            </Grid>
          </ScrollView>
          <CSpace />
        </>
      )}
    </CModal>
  );
};

ScreenWaypointGalery.propTypes = {
  show: PropTypes.bool.isRequired,
  datas: PropTypes.arrayOf(AttachmentShape).isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ScreenWaypointGalery;
