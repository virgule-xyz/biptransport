import React from 'react';
import PropTypes from 'prop-types';
import { CSpace, CMiniHeader, CBigHeader, CTitle } from '@components';
import { Container, Content } from 'native-base';

/**
 * The main screen with a header (full or mini), the content and a title. Eventually centered.
 */
const CContent = ({
  children,
  fullscreen,
  center,
  top,
  stretch,
  title,
  numero,
  dateString,
  name,
  pressRescueButton,
  pressCallManagers,
  pressBackHome,
}) => {
  let ccStyle = null;
  if (center)
    ccStyle = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    };
  if (top)
    ccStyle = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
    };
  if (stretch)
    ccStyle = {
      flex: 1,
      height: '100%',
      justifyContent: 'space-between',
    };

  return (
    <Container>
      {!fullscreen && (
        <CMiniHeader
          numero={numero}
          dateString={dateString}
          name={name}
          pressRescueButton={pressRescueButton}
          pressCallManagers={pressCallManagers}
        />
      )}
      {fullscreen && <CBigHeader pressBackHome={pressBackHome} />}
      <Content padder contentContainerStyle={ccStyle}>
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
  top: PropTypes.bool,
  stretch: PropTypes.bool,
  pressCallManagers: PropTypes.func,
  pressRescueButton: PropTypes.func,
  pressBackHome: PropTypes.func,
  numero: PropTypes.string,
  dateString: PropTypes.string,
  name: PropTypes.string,
};

CContent.defaultProps = {
  title: null,
  fullscreen: false,
  center: false,
  top: false,
  stretch: false,
  pressCallManagers: null,
  pressRescueButton: null,
  pressBackHome: null,
  numero: '',
  dateString: '',
  name: '',
};

export default CContent;
