import React from 'react';
import MapContainer from '../../../../src/components/pages/map/MapContainer';

describe('MapContainer', () => {
  it('renders a default view', () => {
    const container = render(<MapContainer />);
    expect(container).toMatchSnapshot();
  });

  it('has a MapView', () => {
    const container = shallow(<MapContainer />);
    expect(container.find('MapView')).toHaveLength(1);
  });
});
