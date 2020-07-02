import React from 'react';
import selectedNavKeyPropTypes from '../proptypes/selectedNavKeyPropTypes';
import { NK_HOME, NK_LOGIN } from '../constants/navKeys';
import DigitalTerrainWebView from './DigitalTerrainWebView';
import discordAuthenticate from './authentication';

const propTypes = {
  /* The page to load base on the requested url from server */
  selectedNavKey: selectedNavKeyPropTypes.isRequired,
};

/**
 * Top level container. Handles nav management.
 */
class DigitalTerrainWebContainer extends React.Component {
  constructor(props) {
    super(props);
    const { selectedNavKey } = props;
    this.state = { selectedNavKey };

    this.handleNavMenuClick = this.handleNavMenuClick.bind(this);
    this.navigateToNewPage = this.navigateToNewPage.bind(this);
  }

  /**
   * Handles nav menu clicks. Sets selectedNavKey state
   * @param {Object} event - Click event information. See https://ant.design/components/menu/#API
   */
  handleNavMenuClick = (newNavKey) => {
    this.navigateToNewPage(newNavKey);
  };

  navigateToNewPage = (newNavKey) => {
    this.setState({ selectedNavKey: newNavKey === 'title' ? NK_HOME : newNavKey });
  }

  render() {
    const { selectedNavKey } = this.state;
    return (
      <DigitalTerrainWebView
        selectedNavKey={selectedNavKey}
        handleNavMenuClick={this.handleNavMenuClick}
        navigateToNewPage={this.navigateToNewPage}
      />
    );
  }
}
DigitalTerrainWebContainer.propTypes = propTypes;

export default DigitalTerrainWebContainer;
