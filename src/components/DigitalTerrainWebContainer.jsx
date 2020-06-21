import React from 'react';
import selectedNavKeyPropTypes from '../proptypes/selectedNavKeyPropTypes';
import { NK_HOME } from '../constants/navKeys';
import DigitalTerrainWebView from './DigitalTerrainWebView';

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
  }

  /**
   * Handles nav menu clicks. Sets selectedNavKey state
   * @param {Object} event - Click event information. See https://ant.design/components/menu/#API
   */
  handleNavMenuClick = (event) => {
    this.setState({ selectedNavKey: event.key === 'title' ? NK_HOME : event.key });
  };

  render() {
    const { selectedNavKey } = this.state;
    return (
      <DigitalTerrainWebView
        selectedNavKey={selectedNavKey}
        handleNavMenuClick={this.handleNavMenuClick}
      />
    );
  }
}
DigitalTerrainWebContainer.propTypes = propTypes;

export default DigitalTerrainWebContainer;
