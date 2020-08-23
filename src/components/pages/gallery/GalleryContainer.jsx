import React from 'react';
import PropTypes from 'prop-types';
import GalleryView from './GalleryView';
import retrieveGalleryImages from './service';

const propTypes = {
  /* Cached gallery images */
  galleryCachedImages: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* Function to set gallery image cache */
  setCachedGalleryImages: PropTypes.func.isRequired,
};

/**
 * Gallery page container.
 */
class GalleryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isLoadingImagesFailed: false,
      isModalOpen: false,
      carouselIndexStart: 0,
      images: [],
      popupDisabled: false,
    };

    this.handleGalleryImageClick = this.handleGalleryImageClick.bind(this);
    this.updatePopupDisabled = this.updatePopupDisabled.bind(this);
    this.loadImageUrls = this.loadImageUrls.bind(this);
  }

  componentDidMount() {
    this.updatePopupDisabled();
    window.addEventListener('resize', this.updatePopupDisabled);

    this.loadImageUrls();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePopupDisabled);
  }

  loadImageUrls = () => {
    const { galleryCachedImages, setCachedGalleryImages } = this.props;

    const successfulCall = (imageInfo) => {
      this.setState({
        isLoading: false,
        images: imageInfo,
      }, () => { setCachedGalleryImages(imageInfo); });
    };

    const failedCall = () => {
      this.setState({
        isLoading: false,
        isLoadingImagesFailed: true,
      });
    };

    if (galleryCachedImages.length) {
      this.setState({
        isLoading: false,
        images: galleryCachedImages,
      });
    } else {
      retrieveGalleryImages(successfulCall, failedCall);
    }
  }

  updatePopupDisabled = () => {
    this.setState({ popupDisabled: window.innerWidth < 700 });
  }

  handleGalleryImageClick = (newCarouselIndexStart) => {
    const { popupDisabled } = this.state;
    if (!popupDisabled) {
      this.setState((prevState) => ({
        isModalOpen: !prevState.isModalOpen,
        carouselIndexStart: newCarouselIndexStart,
      }));
    }
  }

  render() {
    const {
      isModalOpen,
      carouselIndexStart,
      isLoading,
      isLoadingImagesFailed,
      images,
      popupDisabled,
    } = this.state;
    return (
      <GalleryView
        isModalOpen={isModalOpen}
        handleGalleryImageClick={this.handleGalleryImageClick}
        images={images}
        carouselIndexStart={carouselIndexStart}
        isLoading={isLoading}
        isLoadingImagesFailed={isLoadingImagesFailed}
        popupDisabled={popupDisabled}
      />
    );
  }
}

GalleryContainer.propTypes = propTypes;

export default GalleryContainer;
