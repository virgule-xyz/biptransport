/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, ScrollView } from 'react-native';
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

/**
 * Show the pictures of the waypoint, how to get there and other infos
 */
const ScreenWaypointGalery = ({ show, datas, onClose }) => {
  console.warn('DATAS', datas);

  const { height } = Dimensions.get('window');

  return (
    <CModal onClose={onClose} show={show}>
      <CTitle numberOfLines={1}>Sunt rerum voluptatum dignissimos nobis odio.</CTitle>
      <CSpace />
      <CGreyBox style={{ flex: 0 }}>
        <CWaypointAddress name="Un nom" address="une adresse" />
      </CGreyBox>
      <ScrollView maximumZoomScale={5}>
        <Grid>
          {datas.map(pict => (
            <Row>
              <Col>
                <CSep />
                <CImage
                  image={pict.file}
                  width="100%"
                  height={height * 0.33}
                  resizeMode="contain"
                />
              </Col>
            </Row>
          ))}
        </Grid>
      </ScrollView>
      <CSpace />
    </CModal>
  );
};

ScreenWaypointGalery.propTypes = {
  show: PropTypes.bool.isRequired,
  datas: PropTypes.arrayOf(AttachmentShape).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ScreenWaypointGalery;
