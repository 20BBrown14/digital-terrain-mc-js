import React from 'react';
import PropTypes from 'prop-types';
import { List, Card } from 'antd';
import 'spinkit/spinkit.min.css';
import './Gallery.css';
import ImagePopup from '../../../modules/ImagePopup';
import LoadingScreen from '../LoadingScreen';
import ErrorScreen from '../ErrorScreen';

const propTypes = {
  /* Whether the modal is open */
  isModalOpen: PropTypes.bool.isRequired,
  /* Function to handle button click */
  handleGalleryImageClick: PropTypes.func.isRequired,
  /* Images to show in Gallery */
  images: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired, PropTypes.string.isRequired)).isRequired,
  /* index to start popup image carousel on */
  carouselIndexStart: PropTypes.number,
  /* Whether page is loading */
  isLoading: PropTypes.bool.isRequired,
  /* Whether loading images failed */
  isLoadingImagesFailed: PropTypes.bool.isRequired,
  /* Whether the image popup is disabled or note */
  popupDisabled: PropTypes.bool.isRequired,
};

const defaultProps = {
  carouselIndexStart: 0,
};

const buildImageComponents = (images) => {
  const imageComponents = [];
  images.forEach((image) => {
    imageComponents.push({
      image: (
        <>
          <img
            className="gallery-image"
            src={image.address}
            alt="Loading..."
            key={`image-${image.id}`}
          />
        </>
      ),
      id: image.id,
    });
  });

  return imageComponents;
};

/**
 * Gallery page view.
 */
const GalleryView = (props) => {
  const {
    isModalOpen,
    handleGalleryImageClick,
    images,
    carouselIndexStart,
    isLoading,
    isLoadingImagesFailed,
    popupDisabled,
  } = props;
  if (isLoading) {
    return <LoadingScreen />;
  } if (isLoadingImagesFailed) {
    return <ErrorScreen />;
  }
  return (
    <>
      {images && (
      <List
        grid={{
          xxl: 3,
          xl: 3,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        dataSource={buildImageComponents(images)}
        renderItem={(component) => (
          <List.Item>
            <Card
              hoverable
              bordered={false}
              onClick={() => { handleGalleryImageClick(component.id); }}
            >
              {component.image}
            </Card>
          </List.Item>
        )}
      />
      )}
      <ImagePopup
        isModalVisible={!popupDisabled && isModalOpen}
        closeModal={handleGalleryImageClick}
        images={images}
        carouselIndexStart={carouselIndexStart}
      />
    </>
  );
};

GalleryView.propTypes = propTypes;
GalleryView.defaultProps = defaultProps;

export default GalleryView;
