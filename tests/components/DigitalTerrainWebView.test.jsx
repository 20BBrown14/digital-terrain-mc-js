import React from 'react';
import DigitalTerrainWebView from '../../src/components/DigitalTerrainWebView';

describe('DigitalTerrainWebView', () => {
  let view;
  beforeEach(() => {
    view = shallow(<DigitalTerrainWebView />);
  });

  it('renders a default view', () => {
    view = render(<DigitalTerrainWebView />);
    expect(view).toMatchSnapshot();
  });

  it('has a layout', () => {
    const layouts = view.find('Layout');
    expect(layouts).toHaveLength(1);
  });
});
