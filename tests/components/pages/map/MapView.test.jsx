import React from 'react';
import MapView from '../../../../src/components/pages/map/MapView';

describe('MapView', () => {
  it('renders a default view', () => {
    const view = render(<MapView />);
    expect(view).toMatchSnapshot();
  });
});
