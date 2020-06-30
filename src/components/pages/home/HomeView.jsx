import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Carousel, Space } from 'antd';
import './Home.css';
import PandaDM from '../../../assets/PandaDM.png';
import FossilShop from '../../../assets/FossilShop.png';
import IslandTower from '../../../assets/IslandTower.png';
import Spawn from '../../../assets/June06Spawn.png';
import ShoppingDistrict from '../../../assets/May30ShoppingDistrict.png';
import {
  NK_ABOUT_US,
  NK_GALLERY,
  NK_MAP,
  NK_APPLY,
} from '../../../constants/navKeys';

const propTypes = {
  /* Function to navigate to new page */
  navigateToNewPage: PropTypes.func.isRequired,
};

/**
 * Home page view.
 */
const HomeView = (props) => {
  const { navigateToNewPage } = props;

  const pandaLink = (
    <button
      id="pandaLink"
      className="home-page-link-button"
      type="button"
      onClick={() => { navigateToNewPage(NK_ABOUT_US); }}
      onKeyPress={() => { navigateToNewPage(NK_ABOUT_US); }}
    >
      Panda_Brah
    </button>
  );
  const dmLink = (
    <button
      id="dmLink"
      className="home-page-link-button"
      type="button"
      onClick={() => { navigateToNewPage(NK_ABOUT_US); }}
      onKeyPress={() => { navigateToNewPage(NK_ABOUT_US); }}
    >
      DMDF_
    </button>
  );
  const galleryLink = (
    <button
      id="galleryLink"
      className="home-page-link-button"
      type="button"
      onClick={() => { navigateToNewPage(NK_GALLERY); }}
      onKeyPress={() => { navigateToNewPage(NK_GALLERY); }}
    >
      gallery
    </button>
  );
  const mapLink = (
    <button
      id="mapLink"
      className="home-page-link-button"
      type="button"
      onClick={() => { navigateToNewPage(NK_MAP); }}
      onKeyPress={() => { navigateToNewPage(NK_MAP); }}
    >
      map
    </button>
  );
  const applyLink = (
    <button
      id="applyLink"
      className="home-page-link-button"
      type="button"
      onClick={() => { navigateToNewPage(NK_APPLY); }}
      onKeyPress={() => { navigateToNewPage(NK_APPLY); }}
    >
      apply here
    </button>
  );

  return (
    <div className="home-page-content">
      <Typography.Title className="home-page-title">
        Welcome to Digital Terrain
      </Typography.Title>
      <Space direction="vertical">
        <Typography.Text className="home-page-subtitle">
          {'Digital Terrain is a SMP server inspired by Hermitcraft. The server is based on a great community, trust,\
          and fun. We aspire to have a playerbase of all play styles that work together in harmony to build great\
          things and have an awesome time. The server is owned by '}
          {pandaLink}
          {' and '}
          {dmLink}
          {'. Alongside them we have a team of mods who help make sure everything is running smoothly.'}
        </Typography.Text>
        <Typography.Text className="home-page-subtitle">
          {'Be sure to checkout our '}
          {galleryLink}
          {' and '}
          {mapLink}
          {" to get a feel for the server; hopefully you'll find it's a good place for you!\
          If you decide to, you can "}
          {applyLink}
          {' to be a part of our server. Hope to play with you soon!'}
        </Typography.Text>
      </Space>
      <Carousel
        autoplay
        className="home-page-carousel"
      >
        {
          [
            PandaDM,
            FossilShop,
            IslandTower,
            Spawn,
            ShoppingDistrict,
          ].map((image, index) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <img src={image} alt="" key={`image-${index}`} />
          ))
        }
      </Carousel>
    </div>
  );
};

HomeView.propTypes = propTypes;

export default HomeView;
