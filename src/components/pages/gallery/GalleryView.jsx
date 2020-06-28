import React from 'react';
import PropTypes from 'prop-types';
import { List, Card } from 'antd';
import './Gallery.css';
import ImagePopup from '../../../modules/ImagePopup';

const propTypes = {
  /* Whether the modal is open */
  isModalOpen: PropTypes.bool.isRequired,
  /* Function to handle button click */
  handleGalleryImageClick: PropTypes.func.isRequired,
  /* Images to show in Gallery */
  images: PropTypes.arrayOf(PropTypes.string),
  /* index to start popup image carousel on */
  carouselIndexStart: PropTypes.number,
};

const defaultProps = {
  images: [],
  carouselIndexStart: 0,
};

const buildImageComponents = (images) => (
  images.map((image, index) => ({
    image: (
      <img
        className="gallery-image"
        src={image}
        alt=""
        /* eslint-disable-next-line react/no-array-index-key */
        key={`image-${index}`}
      />
    ),
    id: index,
  }))
);

/**
 * Gallery page view.
 */
const GalleryView = (props) => {
  const {
    isModalOpen,
    handleGalleryImageClick,
    images,
    carouselIndexStart,
  } = props;

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
        isModalVisible={isModalOpen}
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
