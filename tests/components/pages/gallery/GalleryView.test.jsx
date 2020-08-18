import React from 'react';
import GalleryView from '../../../../src/components/pages/gallery/GalleryView';

describe('GalleryView', () => {
  it('renders a default view', () => {
    const view = render(
      <GalleryView
        isModalOpen={false}
        handleGalleryImageClick={() => {}}
        images={[{}, {}, {}, {}]}
        isLoading={false}
        isLoadingImagesFailed={false}
        popupDisabled={false}
      />,
    );
    expect(view).toMatchSnapshot();
  });

  describe('when there are images to display', () => {
    let view;
    beforeEach(() => {
      view = shallow(
        <GalleryView
          isModalOpen={false}
          handleGalleryImageClick={() => {}}
          images={[{}, {}, {}, {}]}
          isLoading={false}
          isLoadingImagesFailed={false}
          popupDisabled={false}
        />,
      );
    });

    it('has a list', () => {
      expect(view.find('List')).toHaveLength(1);
    });

    it('has ImagePopup', () => {
      expect(view.find('ImagePopup')).toHaveLength(1);
    });
  });
});
