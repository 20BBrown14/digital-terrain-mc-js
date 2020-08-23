import React from 'react';
import PropTypes from 'prop-types';
import HomeView from './HomeView';
import loadGalleryImagesService from '../gallery/service';

const propTypes = {
  /* Function to navigate to new page */
  navigateToNewPage: PropTypes.func.isRequired,
  /* Cached carousel images */
  homeCachedImages: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* Function to set cached images */
  setCachedHomeImages: PropTypes.func.isRequired,
};

/**
 * Home page container.
 */
class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCarouselLoading: true,
      isCarouselLoadingFailed: false,
      carouselImages: [],
    };

    this.loadCarouselImages = this.loadCarouselImages.bind(this);
  }

  componentDidMount() {
    this.loadCarouselImages();
  }

  loadCarouselImages = () => {
    const { homeCachedImages, setCachedHomeImages } = this.props;
    const successfulCall = (images) => {
      this.setState({
        isCarouselLoading: false,
        isCarouselLoadingFailed: false,
        carouselImages: images,
      }, () => { setCachedHomeImages(images); });
    };

    const failedCall = () => {
      this.setState({
        isCarouselLoading: false,
        isCarouselLoadingFailed: true,
      });
    };

    if (homeCachedImages.length) {
      this.setState({
        isCarouselLoading: false,
        isCarouselLoadingFailed: false,
        carouselImages: homeCachedImages,
      });
    } else {
      loadGalleryImagesService(successfulCall, failedCall, true);
    }
  }

  render() {
    const {
      navigateToNewPage,
    } = this.props;

    const {
      isCarouselLoading,
      isCarouselLoadingFailed,
      carouselImages,
    } = this.state;

    return (
      <HomeView
        navigateToNewPage={navigateToNewPage}
        isCarouselLoading={isCarouselLoading}
        isCarouselLoadingFailed={isCarouselLoadingFailed}
        carouselImages={carouselImages}
      />
    );
  }
}

HomeContainer.propTypes = propTypes;

export default HomeContainer;
