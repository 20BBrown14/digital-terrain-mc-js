import React from 'react';
import PropTypes from 'prop-types';
import selectedNavKeyPropTypes from '../proptypes/selectedNavKeyPropTypes';
import { NK_HOME } from '../constants/navKeys';
import DigitalTerrainWebView from './DigitalTerrainWebView';

const propTypes = {
  /* The page to load base on the requested url from server */
  selectedNavKey: selectedNavKeyPropTypes.isRequired,
  /* Authenitcated user's discord name */
  discordNick: PropTypes.string.isRequired,
  /* Whether authenticated user is admin */
  isAdmin: PropTypes.bool.isRequired,
  /* JWT Token */
  jwtToken: PropTypes.string.isRequired,
};

/**
 * Top level container. Handles nav management.
 */
class DigitalTerrainWebContainer extends React.Component {
  constructor(props) {
    super(props);
    const { selectedNavKey } = props;
    this.state = {
      selectedNavKey,
      homeCachedImages: [],
      galleryCachedImages: [],
    };

    this.handleNavMenuClick = this.handleNavMenuClick.bind(this);
    this.navigateToNewPage = this.navigateToNewPage.bind(this);
    this.setCachedHomeImages = this.setCachedHomeImages.bind(this);
    this.setCachedGalleryImages = this.setCachedGalleryImages.bind(this);
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

  setCachedHomeImages = (imagesToCache) => {
    this.setState({ homeCachedImages: imagesToCache });
  }

  setCachedGalleryImages = (imagesToCache) => {
    this.setState({ galleryCachedImages: imagesToCache });
  }

  render() {
    const { selectedNavKey, homeCachedImages, galleryCachedImages } = this.state;
    const { discordNick, isAdmin, jwtToken } = this.props;
    return (
      <DigitalTerrainWebView
        selectedNavKey={selectedNavKey}
        handleNavMenuClick={this.handleNavMenuClick}
        navigateToNewPage={this.navigateToNewPage}
        homeCachedImages={homeCachedImages}
        setCachedHomeImages={this.setCachedHomeImages}
        galleryCachedImages={galleryCachedImages}
        setCachedGalleryImages={this.setCachedGalleryImages}
        discordNick={discordNick}
        isAdmin={isAdmin}
        jwtToken={jwtToken}
      />
    );
  }
}
DigitalTerrainWebContainer.propTypes = propTypes;

export default DigitalTerrainWebContainer;
