import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CContent, CText, CSpace } from '@components';

storiesOf('Content', module)
  .add('CContent', () => (
    <CContent>
      <CText>Impossible d'arriver sur ce point</CText>
      <CSpace />
      <CText>
        Ergonomic Wooden Fish TCP deposit Veniam ipsum aut pariatur excepturi
        eaque dolorem ducimus. Excepturi deserunt assumenda sit magnam
        voluptatem nihil. Facilis assumenda velit libero asperiores asperiores.
        Quia odio libero est qui dolores. Adipisci molestiae sed rerum enim. Ea
        neque nisi.
      </CText>
      <CSpace n={5} />
      <CText>Impossible d'arriver sur ce point</CText>
    </CContent>
  ))
  .add('CContent center', () => (
    <CContent fullscreen center>
      <CText>Impossible d'arriver sur ce point</CText>
      <CSpace />
      <CText>
        Ergonomic Wooden Fish TCP deposit Veniam ipsum aut pariatur excepturi
        eaque dolorem ducimus. Excepturi deserunt assumenda sit magnam
        voluptatem nihil. Facilis assumenda velit libero asperiores asperiores.
        Quia odio libero est qui dolores. Adipisci molestiae sed rerum enim. Ea
        neque nisi.
      </CText>
      <CSpace n={5} />
      <CText>Impossible d'arriver sur ce point</CText>
    </CContent>
  ));
