import React from 'react';
import './Header.css';
import { Menu } from 'antd';
import animatedBee from '../../assets/animated_bee.gif';

const beeIcon = <img src={animatedBee} alt="loading..." className="header-icon" />;

function HeaderView() {
  return (
    <div>
      <Menu selectedKeys={[]} mode="horizontal" className="header-menu">
        <Menu.Item disabled key="Icon" icon={beeIcon} className="header-icon-menu-item" />
        <Menu.Item key="Title" className="header-title">Digital Terrain</Menu.Item>
        <Menu.Item key="Home">Home</Menu.Item>
        <Menu.Item key="Gallery">Gallery</Menu.Item>
        <Menu.Item key="Map">Map</Menu.Item>
        <Menu.Item key="Rules">Rules</Menu.Item>
        <Menu.Item key="Info">Server Information</Menu.Item>
        <Menu.Item key="Apply">Apply</Menu.Item>
        <Menu.Item key="About">About us</Menu.Item>
      </Menu>
    </div>
  );
}

export default HeaderView;
