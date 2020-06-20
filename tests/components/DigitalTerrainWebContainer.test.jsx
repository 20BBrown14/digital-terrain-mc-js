import React from 'react';
import DigitalTerrainWebContainer from '../../src/components/DigitalTerrainWebContainer';

describe('DigitalTerrainWebContainer', () => {
  let container;
  beforeEach(() => {
    container = shallow(<DigitalTerrainWebContainer />);
  });

  it('renders a default component', () => {
    container = render(<DigitalTerrainWebContainer />);
    expect(container).toMatchSnapshot();
  });

  it('has a DigitalTerrainWebView', () => {
    const view = container.find('DigitalTerrainWebView');
    expect(view).toHaveLength(1);
  });
});
