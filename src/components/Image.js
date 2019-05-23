import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

/**
 * Wrapper around an Native Base image with a loader
 */
const CImage = ({ image, width, height }) => (
  <Image
    source={{ uri: image }}
    style={{ width, height }}
    resizeMode="contain"
    PlaceholderContent={<ActivityIndicator />}
  />
);

CImage.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default CImage;
