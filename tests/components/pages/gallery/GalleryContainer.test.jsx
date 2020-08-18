import React from 'react';
import GalleryContainer from '../../../../src/components/pages/gallery/GalleryContainer';
import retrieveGalleryImagesService from '../../../../src/components/pages/gallery/service';

jest.mock('../../../../src/components/pages/gallery/service');

describe('GalleryContainer', () => {
  afterEach(() => {
    retrieveGalleryImagesService.mockClear();
  });

  it('renders a default view', () => {
    const container = render(
      <GalleryContainer
        galleryCachedImages={[]}
        setCachedGalleryImages={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('has a default state', () => {
    const container = shallow(
      <GalleryContainer
        galleryCachedImages={[]}
        setCachedGalleryImages={() => {}}
      />,
    ).instance();
    const expectedDefaultState = {
      isLoading: true,
      isLoadingImagesFailed: false,
      isModalOpen: false,
      carouselIndexStart: 0,
      images: [],
      popupDisabled: false,
    };
    expect(container.state).toEqual(expectedDefaultState);
  });

  it('has a GalleryView', () => {
    const container = shallow(
      <GalleryContainer
        galleryCachedImages={[]}
        setCachedGalleryImages={() => {}}
      />,
    );
    expect(container.find('GalleryView')).toHaveLength(1);
  });

  describe('componentDidMount', () => {
    let container;
    beforeEach(() => {
      container = shallow(
        <GalleryContainer
          galleryCachedImages={[]}
          setCachedGalleryImages={() => {}}
        />,
      ).instance();
    });

    it('calls updatePopupDisabled, addEventListener, and loadImageUrls', () => {
      container.updatePopupDisabled = jest.fn();
      window.addEventListener = jest.fn();
      container.loadImageUrls = jest.fn();

      container.componentDidMount();

      expect(container.updatePopupDisabled).toHaveBeenCalledTimes(1);
      expect(window.addEventListener).toHaveBeenCalledTimes(1);
      expect(window.addEventListener).toHaveBeenCalledWith('resize', container.updatePopupDisabled);
      expect(container.loadImageUrls).toHaveBeenCalledTimes(1);
    });
  });

  describe('componentWillUnmount', () => {
    let container;
    beforeEach(() => {
      container = shallow(
        <GalleryContainer
          galleryCachedImages={[]}
          setCachedGalleryImages={() => {}}
        />,
      ).instance();
    });

    it('calls removeEventListener', () => {
      container.updatePopupDisabled = jest.fn();
      window.removeEventListener = jest.fn();

      container.componentWillUnmount();

      expect(window.removeEventListener).toHaveBeenCalledTimes(1);
      expect(window.removeEventListener).toHaveBeenCalledWith('resize', container.updatePopupDisabled);
    });
  });

  describe('loadImageUrls', () => {
    describe('images are cached', () => {
      let container;
      beforeEach(() => {
        container = shallow(
          <GalleryContainer
            galleryCachedImages={[{}, {}, {}, {}]}
            setCachedGalleryImages={() => {}}
          />,
        ).instance();
      });

      it('sets state as expected', () => {
        container.state.isLoading = true;
        container.state.images = [];
        container.loadImageUrls();

        expect(container.state.isLoading).toEqual(false);
        expect(container.state.images).toEqual([{}, {}, {}, {}]);
      });
    });

    describe('images are not cached', () => {
      let container;
      let mockSetCachedGalleryImages;
      beforeEach(() => {
        mockSetCachedGalleryImages = jest.fn();
        container = shallow(
          <GalleryContainer
            galleryCachedImages={[]}
            setCachedGalleryImages={mockSetCachedGalleryImages}
          />,
        ).instance();
        retrieveGalleryImagesService.mockClear();
      });

      it('calls retrieveGalleryImages service', () => {
        container.loadImageUrls();
        expect(retrieveGalleryImagesService).toHaveBeenCalledTimes(1);
        expect(retrieveGalleryImagesService).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
        );
      });

      describe('successful call', () => {
        beforeEach(() => {
          retrieveGalleryImagesService.mockImplementation((success) => {
            success([{}, {}, {}, {}]);
          });
        });

        it('sets state as expected and calls setCachedGalleryImages', () => {
          container.loadImageUrls();
          expect(container.state.isLoading).toEqual(false);
          expect(container.state.images).toEqual([{}, {}, {}, {}]);
          expect(mockSetCachedGalleryImages).toHaveBeenCalledTimes(1);
          expect(mockSetCachedGalleryImages).toHaveBeenCalledWith([{}, {}, {}, {}]);
        });
      });

      describe('failed call', () => {
        beforeEach(() => {
          retrieveGalleryImagesService.mockImplementation((success, fail) => {
            fail();
          });
        });

        it('sets state as expected', () => {
          container.loadImageUrls();

          expect(container.state.isLoading).toEqual(false);
          expect(container.state.isLoadingImagesFailed).toEqual(true);
        });
      });
    });
  });

  describe('handleGalleryImageClick', () => {
    let instance;
    beforeEach(() => {
      instance = shallow(
        <GalleryContainer
          galleryCachedImages={[]}
          setCachedGalleryImages={() => {}}
        />,
      ).instance();
    });
    describe('popup is not disabled', () => {
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

    describe('popup is disabled', () => {
      it('does nothing', () => {
        instance.state.popupDisabled = true;
        const initialState = instance.state;
        instance.handleGalleryImageClick();
        expect(instance.state).toEqual(initialState);
      });
    });
  });
});
