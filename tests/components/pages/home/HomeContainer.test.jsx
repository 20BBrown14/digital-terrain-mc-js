import React from 'react';
import HomeContainer from '../../../../src/components/pages/home/HomeContainer';
import loadGalleryImagesService from '../../../../src/components/pages/gallery/service';

jest.mock('../../../../src/components/pages/gallery/service');

describe('HomeContainer', () => {
  afterEach(() => {
    loadGalleryImagesService.mockClear();
  });

  it('renders a default view', () => {
    const container = render(
      <HomeContainer
        navigateToNewPage={() => {}}
        homeCachedImages={[]}
        setCachedHomeImages={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('has a HomeView', () => {
    const container = shallow(
      <HomeContainer
        navigateToNewPage={() => {}}
        homeCachedImages={[]}
        setCachedHomeImages={() => {}}
      />,
    );
    expect(container.find('HomeView')).toHaveLength(1);
  });

  it('has a default state', () => {
    const container = shallow(
      <HomeContainer
        navigateToNewPage={() => {}}
        homeCachedImages={[]}
        setCachedHomeImages={() => {}}
      />,
    ).instance();

    const expectedState = {
      isCarouselLoading: true,
      isCarouselLoadingFailed: false,
      carouselImages: [],
    };

    expect(container.state).toEqual(expectedState);
  });

  describe('componentDidMount', () => {
    let container;
    beforeEach(() => {
      container = shallow(
        <HomeContainer
          navigateToNewPage={() => {}}
          homeCachedImages={[]}
          setCachedHomeImages={() => {}}
        />,
      ).instance();
    });

    it('calls loadCarouselImages', () => {
      container.loadCarouselImages = jest.fn();
      container.componentDidMount();
      expect(container.loadCarouselImages).toHaveBeenCalledTimes(1);
    });
  });

  describe('loadCarouselImages', () => {
    describe('images are cached', () => {
      let container;
      beforeEach(() => {
        container = shallow(
          <HomeContainer
            navigateToNewPage={() => {}}
            homeCachedImages={[{}, {}, {}, {}]}
            setCachedHomeImages={() => {}}
          />,
        ).instance();
      });

      it('sets state as expected', () => {
        container.state.isCarouselLoadingFailed = true;
        container.loadCarouselImages();
        expect(container.state.isCarouselLoading).toEqual(false);
        expect(container.state.isCarouselLoadingFailed).toEqual(false);
        expect(container.state.carouselImages).toEqual([{}, {}, {}, {}]);
      });
    });

    describe('images are not cached', () => {
      let container;
      let mockSetCachedHomeImages;
      beforeEach(() => {
        mockSetCachedHomeImages = jest.fn();
        container = shallow(
          <HomeContainer
            navigateToNewPage={() => {}}
            homeCachedImages={[]}
            setCachedHomeImages={mockSetCachedHomeImages}
          />,
        ).instance();
      });

      it('calls loadGalleryImagesService', () => {
        loadGalleryImagesService.mockClear();
        container.loadCarouselImages();
        expect(loadGalleryImagesService).toHaveBeenCalledTimes(1);
        expect(loadGalleryImagesService).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function),
          true,
        );
      });

      describe('successful call', () => {
        beforeEach(() => {
          loadGalleryImagesService.mockImplementation((success) => {
            success([{}, {}, {}, {}]);
          });
        });

        it('sets state as expected and calls setCachedHomeImages', () => {
          container.loadCarouselImages();
          expect(container.state.isCarouselLoading).toEqual(false);
          expect(container.state.isCarouselLoadingFailed).toEqual(false);
          expect(container.state.carouselImages).toEqual([{}, {}, {}, {}]);
          expect(mockSetCachedHomeImages).toHaveBeenCalledTimes(1);
          expect(mockSetCachedHomeImages).toHaveBeenCalledWith([{}, {}, {}, {}]);
        });
      });

      describe('failed call', () => {
        beforeEach(() => {
          loadGalleryImagesService.mockImplementation((success, fail) => {
            fail();
          });
        });

        it('sets state as expected', () => {
          container.loadCarouselImages();
          expect(container.state.isCarouselLoading).toEqual(false);
          expect(container.state.isCarouselLoadingFailed).toEqual(true);
        });
      });
    });
  });
});
