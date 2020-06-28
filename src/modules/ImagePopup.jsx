import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Carousel,
  Row,
  Col,
} from 'antd';
import './ImagePopup.css';
import {
  RightCircleTwoTone,
  LeftCircleTwoTone,
} from '@ant-design/icons';

const propTypes = {
  /* Whether the modal is visible or not */
  isModalVisible: PropTypes.bool.isRequired,
  /* Function to close the modal */
  closeModal: PropTypes.func.isRequired,
  /* Images to show in modal */
  images: PropTypes.arrayOf(PropTypes.string),
  /* Index to start image carousel on */
  carouselIndexStart: PropTypes.number,
};

const defaultProps = {
  images: [],
  carouselIndexStart: 0,
};

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);

    this.carousel = undefined;

    this.createCarouselRef = this.createCarouselRef.bind(this);
  }

  componentDidUpdate() {
    const { carouselIndexStart } = this.props;
    if (this.carousel) {
      this.carousel.goTo(carouselIndexStart);
    }
  }

  createCarouselRef(node) {
    this.carousel = node;
  }

  render() {
    const {
      isModalVisible,
      closeModal,
      images,
      carouselIndexStart,
    } = this.props;
    const buildImageComponents = () => (
      images.map((image, index) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <img src={image} alt="" key={`image-${index}`} />
      ))
    );

    return (
      <Modal
        title="Image Popup"
        centered
        visible={isModalVisible && !!images}
        onCancel={closeModal}
        footer={null}
        className="image-popup-modal"
        width="80%"
      >
        <Row>
          <Col lg={1} md={2} sm={2} xs={2}>
            <Button
              className="image-popup-previous-button"
              shape="circle"
              icon={<LeftCircleTwoTone />}
              onClick={() => { this.carousel.prev(); }}
            />
          </Col>
          <Col lg={22} md={20} sm={20} xs={20}>
            <Carousel
              dots={false}
              autoplay={false}
              ref={this.createCarouselRef}
              initialSlide={carouselIndexStart}
            >

              {buildImageComponents()}
            </Carousel>
          </Col>
          <Col lg={1} md={2} sm={2} xs={2}>
            <Button
              className="image-popup-next-button"
              shape="circle"
              icon={<RightCircleTwoTone />}
              onClick={() => { this.carousel.next(); }}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}

ImagePopup.propTypes = propTypes;
ImagePopup.defaultProps = defaultProps;

export default ImagePopup;
