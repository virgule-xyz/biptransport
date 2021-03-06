/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'native-base';
import { CText, COLORS, DEFAULT_FONT_SIZE, CSep } from '@components';

/**
 * A simple button line for the collection of waypoint
 */
const CWaypointOtherPassage = ({ wp, ...props }) => {
  const { key, id, name, city, ord, onPress } = wp;
  const textColor = key % 2 === 1 && { color: COLORS.WHITE };
  return (
    <TouchableOpacity testID={`${props.testID}_${id}`} key={`${key}`} onPress={() => onPress(id)}>
      <Grid
        style={[
          key % 2 === 1
            ? { backgroundColor: COLORS.ROW_EVEN }
            : { backgroundColor: COLORS.ROW_PAIR },
          { padding: DEFAULT_FONT_SIZE / 2, marginBottom: 2 },
        ]}
      >
        <Row>
          <CText style={[textColor, { fontWeight: 'bold' }]}>Pour {ord}</CText>
        </Row>
        <Row>
          <CText style={[textColor, { fontWeight: 'bold' }]}>à {city}</CText>
        </Row>
        <Row>
          <CText style={textColor}>{name}</CText>
        </Row>
      </Grid>
    </TouchableOpacity>
  );
};

export const WaypointOtherPassageShape = PropTypes.shape({
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  ord: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
});

CWaypointOtherPassage.propTypes = {
  wp: WaypointOtherPassageShape.isRequired,
};

export default CWaypointOtherPassage;
