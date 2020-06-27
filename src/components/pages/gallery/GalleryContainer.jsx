import React from 'react';
import GalleryView from './GalleryView';
import FossilShop from '../../../assets/FossilShop.png';
import IslandTower from '../../../assets/IslandTower.png';
import Spawn from '../../../assets/June06Spawn.png';
import ShoppingDistrict from '../../../assets/May30ShoppingDistrict.png';
import PandaDM from '../../../assets/PandaDM.png';

/**
 * Gallery page container.
 */
class GalleryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isModalOpen: false, carouselIndexStart: 0 };

    this.handleGalleryImageClick = this.handleGalleryImageClick.bind(this);
  }

  handleGalleryImageClick(newCarouselIndexStart) {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
      carouselIndexStart: newCarouselIndexStart,
    }));
  }

  render() {
    const { isModalOpen, carouselIndexStart } = this.state;
    return (
      <GalleryView
        isModalOpen={isModalOpen}
        handleGalleryImageClick={this.handleGalleryImageClick}
        images={[FossilShop, IslandTower, Spawn, ShoppingDistrict, PandaDM]}
        carouselIndexStart={carouselIndexStart}
      />
    );
  }
}

export default GalleryContainer;
