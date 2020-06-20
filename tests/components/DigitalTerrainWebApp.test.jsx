import React from 'react';
import DigitalTerrainWebApp from '../../src/components/DigitalTerrainWebApp';

describe('DigitalTerrainWebApp', () => {
  it('should render a default view', () => {
    const testApp = render(
      <DigitalTerrainWebApp />,
    );
    expect(testApp).toMatchSnapshot();
  });

  it('has a web container', () => {
    const testApp = shallow(
      <DigitalTerrainWebApp />,
    );
    const container = testApp.find('.digital-terrain-web-app');
    expect(container).toHaveLength(1);
  });
});
