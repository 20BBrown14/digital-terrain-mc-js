import React from 'react';
import PropTypes from 'prop-types';
import selectedNavKeyPropTypes from '../../proptypes/selectedNavKeyPropTypes';
import HeaderView from './HeaderView';

const propTypes = {
  /* The page to load base on the requested url from server */
  selectedNavKey: selectedNavKeyPropTypes.isRequired,
  /* Function for handling menu item click */
  handleNavMenuClick: PropTypes.func.isRequired,
};

/**
 * Header container. Renders Header view.
 */
const HeaderContainer = (props) => {
  const { selectedNavKey, handleNavMenuClick } = props;
  return (
    <HeaderView
      selectedNavKey={selectedNavKey}
      handleNavMenuClick={handleNavMenuClick}
    />
  );
};

HeaderContainer.propTypes = propTypes;

export default HeaderContainer;
