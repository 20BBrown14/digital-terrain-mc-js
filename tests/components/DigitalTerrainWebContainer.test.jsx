import React from 'react';
import DigitalTerrainWebContainer from '../../src/components/DigitalTerrainWebContainer';

describe('DigitalTerrainWebContainer', () => {
  let container;
  beforeEach(() => {
    container = shallow(<DigitalTerrainWebContainer selectedNavKey="home" />);
  });

  it('renders a default component', () => {
    container = render(<DigitalTerrainWebContainer selectedNavKey="home" />);
    expect(container).toMatchSnapshot();
  });

  it('has a DigitalTerrainWebView', () => {
    const view = container.find('DigitalTerrainWebView');
    expect(view).toHaveLength(1);
  });

  it('sets default state', () => {
    expect(container.instance().state.selectedNavKey).toEqual('home');
  });

  describe('handleNavMenuClick', () => {
    let instance;
    beforeEach(() => {
      instance = container.instance();
    });
    it('sets selectedNavKey to pass key', () => {
      expect(instance.state.selectedNavKey).toEqual('home');
      instance.handleNavMenuClick({ key: 'map' });
      expect(instance.state.selectedNavKey).toEqual('map');
    });
  });
});
