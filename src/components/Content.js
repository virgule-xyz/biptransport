import React from 'react';
import PropTypes from 'prop-types';
import { CSpace } from '@components';
import { Image, Dimensions } from 'react-native';
import { Container, Content, Header, Title, Button, Left, Right, Body } from 'native-base';
import CTitle from './title';

import { LOGO } from '@medias';

/**
 * The main screen with a header (full or mini), the content and a title. Eventually centered.
 */
const CContent = ({ children, fullscreen, center, title }) => {
  const onPressBackHome = () => {};
  const { width } = Dimensions.get('window');

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
        contentContainerStyle={[
          center && {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        {title && (
          <>
            <CTitle>{title}</CTitle>
            <CSpace />
          </>
        )}
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
