import React from 'react';
import GalleryContainer from '../../../../src/components/pages/gallery/GalleryContainer';

describe('GalleryContainer', () => {
  it('renders a default view', () => {
    const container = render(<GalleryContainer />);
    expect(container).toMatchSnapshot();
  });

  it('has a GalleryView', () => {
    const container = shallow(<GalleryContainer />);
    expect(container.find('GalleryView')).toHaveLength(1);
  });
});
