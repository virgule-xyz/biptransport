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
const ScreenWaypointGalery = ({ show, datas, name, address, onClose }) => {
  console.warn('DATAS', datas);

  const { height } = Dimensions.get('window');

  return (
    <CModal onClose={onClose} show={show}>
      {/* <CSpace />
      <CGreyBox style={{ flex: 0 }}>
        <CWaypointAddress name={name} address={address} />
      </CGreyBox> */}
      <ScrollView maximumZoomScale={5}>
        <Grid>
          {datas &&
            datas.map(pict => (
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
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ScreenWaypointGalery;
