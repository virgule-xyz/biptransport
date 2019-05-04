import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { CText, CSpace } from '@components';

storiesOf('Space', module)
  .add('CSpace', () => (
    <View>
      <CText>Impossible d'arriver sur ce point</CText>
      <CSpace />
      <CText>
        Ergonomic Wooden Fish TCP deposit Veniam ipsum aut pariatur excepturi eaque dolorem ducimus.
        Excepturi deserunt assumenda sit magnam voluptatem nihil. Facilis assumenda velit libero
        asperiores asperiores. Quia odio libero est qui dolores. Adipisci molestiae sed rerum enim.
        Ea neque nisi.
      </CText>
      <CSpace n={5} />
      <CText>Impossible d'arriver sur ce point</CText>
    </View>
  ))
  .add('CSpace center', () => (
    <View>
      <CText>Impossible d'arriver sur ce point</CText>
      <CSpace />
      <CText>
        Ergonomic Wooden Fish TCP deposit Veniam ipsum aut pariatur excepturi eaque dolorem ducimus.
        Excepturi deserunt assumenda sit magnam voluptatem nihil. Facilis assumenda velit libero
        asperiores asperiores. Quia odio libero est qui dolores. Adipisci molestiae sed rerum enim.
        Ea neque nisi.
      </CText>
      <CSpace n={5} />
      <CText>Impossible d'arriver sur ce point</CText>
    </View>
  ));
