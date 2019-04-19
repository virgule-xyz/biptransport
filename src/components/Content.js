import React from 'react';
import PropTypes from 'prop-types';
import { Image, Dimensions } from 'react-native';
import {
  Container,
  Content,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
} from 'native-base';
import CTitle from './Title';

import { LOGO } from '@medias';

const CContent = ({ children, fullscreen, center, title }) => {
  const onPressBackHome = () => {};
  const { width, height } = Dimensions.get('window');

  return (
    <Container>
      {!fullscreen && (
        <Header>
          <Left />
          <Body>
            <Title>Mini header</Title>
          </Body>
          <Right />
        </Header>
      )}
      {fullscreen && (
        <Header
          style={{
            width,
            height: (380 / 1024) * width,
          }}
        >
          <Body>
            <Button transparent onPress={onPressBackHome}>
              <Image source={LOGO} resizeMode="contain" style={{ flex: 1 }} />
            </Button>
          </Body>
        </Header>
      )}
      <Content
        padder
        contentContainerStyle={
          center && {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }
        }
      >
        {title && <CTitle>{title}</CTitle>}
        {children}
      </Content>
    </Container>
  );
};

CContent.propTypes = {
  title: PropTypes.string,
  fullscreen: PropTypes.bool,
  center: PropTypes.bool,
};

CContent.defaultProps = {
  title: null,
  fullscreen: true,
  center: false,
};

export default CContent;
