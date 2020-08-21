import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import './DigitalTerrainWebApp.css';
import selectedNavKeyPropTypes from '../proptypes/selectedNavKeyPropTypes';
import {
  NK_HOME,
  NK_GALLERY,
  NK_MAP,
  NK_RULES,
  NK_SERVER_INFORMATION,
  NK_APPLY,
  NK_ABOUT_US,
  NK_ADMIN,
} from '../constants/navKeys';
import HomeContainer from './pages/home/HomeContainer';
import GalleryContainer from './pages/gallery/GalleryContainer';
import MapContainer from './pages/map/MapContainer';
import RulesContainer from './pages/rules/RulesContainer';
import ServerInformationContainer from './pages/server_information/ServerInformationContainer';
import ApplyContainer from './pages/apply/ApplyContainer';
import AboutUsContainer from './pages/about_us/AboutUsContainer';
import HeaderContainer from './header/HeaderContainer';
import AdminContainer from './pages/admin/AdminContainer';

const propTypes = {
  /* The page to load base on the requested url from server */
  selectedNavKey: selectedNavKeyPropTypes.isRequired,
  /* Function for handling menu item click */
  handleNavMenuClick: PropTypes.func.isRequired,
  /* Function for navigating to new page */
  navigateToNewPage: PropTypes.func.isRequired,
  /* Cached home page Images */
  homeCachedImages: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* Function to set home page image cache */
  setCachedHomeImages: PropTypes.func.isRequired,
  /* Cached gallery images */
  galleryCachedImages: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* Function to set cached gallery images */
  setCachedGalleryImages: PropTypes.func.isRequired,

};

/**
 * Determines which body content to render based on selectedNavKey prop
 * @param {Object} propsObject - All view props
 * @returns {JSX.element}
 */
const determineBodyContent = (propsObject) => {
  const {
    selectedNavKey,
    navigateToNewPage,
    homeCachedImages,
    setCachedHomeImages,
    galleryCachedImages,
    setCachedGalleryImages,
  } = propsObject;
  switch (selectedNavKey) {
    default:
    case NK_HOME:
      return (
        <HomeContainer
          navigateToNewPage={navigateToNewPage}
          homeCachedImages={homeCachedImages}
          setCachedHomeImages={setCachedHomeImages}
        />
      );
    case NK_GALLERY:
      return (
        <GalleryContainer
          galleryCachedImages={galleryCachedImages}
          setCachedGalleryImages={setCachedGalleryImages}
        />
      );
    case NK_MAP:
      return (
        <MapContainer />
      );
    case NK_RULES:
      return (
        <RulesContainer />
      );
    case NK_SERVER_INFORMATION:
      return (
        <ServerInformationContainer />
      );
    case NK_APPLY:
      return (
        <ApplyContainer />
      );
    case NK_ABOUT_US:
      return (
        <AboutUsContainer />
      );
    case NK_ADMIN:
      return (
        <AdminContainer />
      );
  }
};

/**
 * Top level view
 */
const DigitalTerrainWebView = (props) => {
  const {
    selectedNavKey,
    handleNavMenuClick,
    navigateToNewPage,
    homeCachedImages,
    setCachedHomeImages,
    galleryCachedImages,
    setCachedGalleryImages,
  } = props;
  return (
    <Layout className="web-view-layout">
      <Layout.Header className="web-view-layout-header">
        <HeaderContainer
          selectedNavKey={selectedNavKey}
          handleNavMenuClick={handleNavMenuClick}
        />
      </Layout.Header>
      <Layout.Content className="web-view-layout-content">
        {determineBodyContent({
          selectedNavKey,
          navigateToNewPage,
          homeCachedImages,
          setCachedHomeImages,
          galleryCachedImages,
          setCachedGalleryImages,
        })}
      </Layout.Content>
      <Layout.Footer>
        © 2020 Copyright Digital Terrain
      </Layout.Footer>
    </Layout>
  );
};

DigitalTerrainWebView.propTypes = propTypes;

export default DigitalTerrainWebView;
