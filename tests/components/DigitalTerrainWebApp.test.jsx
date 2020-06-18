import React from 'react';
import DigitalTerrainWebApp from '../../src/components/DigitalTerrainWebApp';

describe('DigitalTerrainWebApp', () => {
  it('should render a default view', () => {
    const testApp = render(
      <DigitalTerrainWebApp />,
    );
    expect(testApp).toMatchSnapshot();
  });
});
