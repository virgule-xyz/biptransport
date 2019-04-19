import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { CModal, CButton } from '@components';
import { View, Text } from 'react-native';

const MyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <CButton
        onPress={() => {
          setIsVisible(true);
        }}
        label="Show"
      />
      <CModal
        show={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
      >
        <Text>Hello from Overlay!</Text>
      </CModal>
    </View>
  );
};

const MyFullComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <CButton
        onPress={() => {
          setIsVisible(true);
        }}
        label="Show"
      />
      <CModal
        show={isVisible}
        onCancel={() => {
          setIsVisible(false);
        }}
        onContinue={() => {
          setIsVisible(false);
        }}
      >
        <Text>Hello from Overlay!</Text>
      </CModal>
    </View>
  );
};

storiesOf('Modal', module)
  .add('CModal 1', () => <MyComponent />)
  .add('CModal 2', () => <MyFullComponent />);
