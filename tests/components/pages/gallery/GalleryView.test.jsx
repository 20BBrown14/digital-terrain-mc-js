import React from 'react';
import GalleryView from '../../../../src/components/pages/gallery/GalleryView';

describe('GalleryView', () => {
  it('renders a default view', () => {
    const view = render(<GalleryView />);
    expect(view).toMatchSnapshot();
  });
});
