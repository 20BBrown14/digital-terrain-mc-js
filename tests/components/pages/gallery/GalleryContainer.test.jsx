import React from 'react';
import GalleryContainer from '../../../../src/components/pages/gallery/GalleryContainer';

describe('GalleryContainer', () => {
  it('renders a default view', () => {
    const container = render(<GalleryContainer />);
    expect(container).toMatchSnapshot();
  });

  it('has a default state', () => {
    const container = shallow(<GalleryContainer />).instance();
    const expectedDefaultState = {
      isModalOpen: false,
      carouselIndexStart: 0,
    };
    expect(container.state).toEqual(expectedDefaultState);
  });

  it('has a GalleryView', () => {
    const container = shallow(<GalleryContainer />);
    expect(container.find('GalleryView')).toHaveLength(1);
  });

  describe('handleGalleryImageClick', () => {
    let instance;
    beforeEach(() => {
      instance = shallow(<GalleryContainer />).instance();
    });

    afterEach(() => {
      instance = undefined;
    });

    it('toggles isModalOpen state', () => {
      expect(instance.state.isModalOpen).toEqual(false);
      instance.handleGalleryImageClick();
      expect(instance.state.isModalOpen).toEqual(true);
      instance.handleGalleryImageClick();
      expect(instance.state.isModalOpen).toEqual(false);
    });

    it('sets carouselIndexStart', () => {
      expect(instance.state.carouselIndexStart).toEqual(0);
      instance.handleGalleryImageClick(5);
      expect(instance.state.carouselIndexStart).toEqual(5);
    });
  });
});
