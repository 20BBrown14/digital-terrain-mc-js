import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { Menu } from 'antd';
import {
  NK_HOME,
  NK_GALLERY,
  NK_MAP,
  NK_RULES,
  NK_SERVER_INFORMATION,
  NK_APPLY,
  NK_ABOUT_US,
  NK_LOGIN,
} from '../../constants/navKeys';
import selectedNavKeyPropTypes from '../../proptypes/selectedNavKeyPropTypes';
import animatedBee from '../../assets/animated_bee.gif';

const propTypes = {
  /* The page to load base on the requested url from server */
  selectedNavKey: selectedNavKeyPropTypes.isRequired,
  /* Function for handling menu item click */
  handleNavMenuClick: PropTypes.func.isRequired,
};

const beeIcon = <img src={animatedBee} alt="loading..." className="header-icon" />;

/**
 * Header view. Renders menu items.
 */
const HeaderView = (props) => {
  const { selectedNavKey, handleNavMenuClick } = props;
  return (
    <div>
      <Menu
        selectedKeys={[selectedNavKey]}
        mode="horizontal"
        className="header-menu"
        onClick={(event) => { handleNavMenuClick(event.key); }}
      >
        <Menu.Item
          disabled
          key="icon"
          icon={beeIcon}
          className="header-icon-menu-item"
        />
        <Menu.Item
          key="title"
          className="header-title header-non-highlighted-menu-item"
        >
          Digital Terrain
        </Menu.Item>
        <Menu.Item
          key={NK_HOME}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key={NK_GALLERY}
        >
          Gallery
        </Menu.Item>
        <Menu.Item
          key={NK_MAP}
        >
          Map
        </Menu.Item>
        <Menu.Item
          key={NK_RULES}
        >
          Rules
        </Menu.Item>
        <Menu.Item
          key={NK_SERVER_INFORMATION}
        >
          Server Information
        </Menu.Item>
        <Menu.Item
          key={NK_APPLY}
        >
          Apply
        </Menu.Item>
        <Menu.Item
          key={NK_ABOUT_US}
        >
          About us
        </Menu.Item>
        <Menu.Item
          key={NK_LOGIN}
        >
          <a href="https://discord.com/api/oauth2/authorize?client_id=693123471210709072&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Floggedin&response_type=token&scope=identify%20guilds">Login</a>
        </Menu.Item>
      </Menu>
    </div>
  );
};

HeaderView.propTypes = propTypes;

export default HeaderView;
