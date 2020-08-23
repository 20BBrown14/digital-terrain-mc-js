import React from 'react';
import PropTypes from 'prop-types';
import './DigitalTerrainWebApp.css';
import 'antd/dist/antd.css';
import { NK_HOME } from '../constants/navKeys';
import selectedNavKeyPropTypes from '../proptypes/selectedNavKeyPropTypes';
import DigitalTerrainWebContainer from './DigitalTerrainWebContainer';

const propTypes = {
  /* The page to load base on the requested url from server */
  selectedNavKey: selectedNavKeyPropTypes,
  /* Authenitcated user's discord name */
  discordNick: PropTypes.string,
  /* Whether authenticated user is admin */
  isAdmin: PropTypes.bool,
  /* JWT Token */
  jwtToken: PropTypes.string,
};

const defaultProps = {
  selectedNavKey: NK_HOME,
  discordNick: '',
  isAdmin: false,
  jwtToken: '',
};

/**
 * Top level component for the app
 */
const DigitalTerrainWebApp = (props) => {
  const {
    selectedNavKey,
    discordNick,
    isAdmin,
    jwtToken,
  } = props;
  return (
    <div>
      <DigitalTerrainWebContainer
        selectedNavKey={selectedNavKey}
        discordNick={discordNick}
        isAdmin={isAdmin}
        jwtToken={jwtToken}
      />
    </div>
  );
};

DigitalTerrainWebApp.propTypes = propTypes;
DigitalTerrainWebApp.defaultProps = defaultProps;

export default DigitalTerrainWebApp;
