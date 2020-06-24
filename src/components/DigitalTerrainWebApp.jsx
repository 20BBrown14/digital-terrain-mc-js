import React from 'react';
import './DigitalTerrainWebApp.css';
import 'antd/dist/antd.css';
import { NK_HOME } from '../constants/navKeys';
import selectedNavKeyPropTypes from '../proptypes/selectedNavKeyPropTypes';
import DigitalTerrainWebContainer from './DigitalTerrainWebContainer';

const propTypes = {
  /* The page to load base on the requested url from server */
  selectedNavKey: selectedNavKeyPropTypes,
};

const defaultProps = {
  selectedNavKey: NK_HOME,
};

/**
 * Top level component for the app
 */
const DigitalTerrainWebApp = (props) => {
  const { selectedNavKey } = props;
  return (
    <div className="digital-terrain-web-app">
      <DigitalTerrainWebContainer
        selectedNavKey={selectedNavKey}
      />
    </div>
  );
};

DigitalTerrainWebApp.propTypes = propTypes;
DigitalTerrainWebApp.defaultProps = defaultProps;

export default DigitalTerrainWebApp;
