import React from 'react';
import PropTypes from 'prop-types';
import selectedNavKeyPropTypes from '../../proptypes/selectedNavKeyPropTypes';
import HeaderView from './HeaderView';

const propTypes = {
  /* The page to load base on the requested url from server */
  selectedNavKey: selectedNavKeyPropTypes.isRequired,
  /* Function for handling menu item click */
  handleNavMenuClick: PropTypes.func.isRequired,
  /* Authenitcated user's discord name */
  discordNick: PropTypes.string.isRequired,
  /* Whether authenticated user is admin */
  isAdmin: PropTypes.bool.isRequired,
};

/**
 * Header container. Renders Header view.
 */
class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showTitle: true };

    this.updateShowTitle = this.updateShowTitle.bind(this);
  }

  componentDidMount() {
    this.updateShowTitle();
    window.addEventListener('resize', this.updateShowTitle);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateShowTitle);
  }

  updateShowTitle() {
    this.setState({ showTitle: window.innerWidth > 442 });
  }

  render() {
    const {
      selectedNavKey,
      handleNavMenuClick,
      discordNick,
      isAdmin,
    } = this.props;
    const { showTitle } = this.state;
    return (
      <HeaderView
        selectedNavKey={selectedNavKey}
        handleNavMenuClick={handleNavMenuClick}
        showTitle={showTitle}
        discordNick={discordNick}
        isAdmin={isAdmin}
      />
    );
  }
}

HeaderContainer.propTypes = propTypes;

export default HeaderContainer;
