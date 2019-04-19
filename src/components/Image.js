import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

const CImage = ({ image, width, height }) => (
  <Image
    source={{ uri: image }}
    style={{ width, height }}
    PlaceholderContent={<ActivityIndicator />}
  />
);

export default CImage;
