import React from 'react';
import DigitalTerrainWebView from '../../src/components/DigitalTerrainWebView';

describe('DigitalTerrainWebView', () => {
  let view;
  beforeEach(() => {
    view = shallow(
      <DigitalTerrainWebView
        selectedNavKey="home"
        handleNavMenuClick={() => {}}
        navigateToNewPage={() => {}}
        homeCachedImages={[]}
        setCachedHomeImages={() => {}}
        galleryCachedImages={[]}
        setCachedGalleryImages={() => {}}
      />,
    );
  });

  it('renders a default view', () => {
    view = render(
      <DigitalTerrainWebView
        selectedNavKey="home"
        handleNavMenuClick={() => {}}
        navigateToNewPage={() => {}}
        homeCachedImages={[]}
        setCachedHomeImages={() => {}}
        galleryCachedImages={[]}
        setCachedGalleryImages={() => {}}
      />,
    );
    expect(view).toMatchSnapshot();
  });

  describe('it has expected components', () => {
    it('has a layout', () => {
      const layouts = view.find('Layout');
      const layoutHeaders = view.find('Header');
      const layoutContents = view.find('Content');
      const layoutFooters = view.find('Footer');
      expect(layouts).toHaveLength(1);
      expect(layoutHeaders).toHaveLength(1);
      expect(layoutContents).toHaveLength(1);
      expect(layoutFooters).toHaveLength(1);
    });

    it('has a header container', () => {
      const headerContainers = view.find('HeaderContainer');
      expect(headerContainers).toHaveLength(1);
    });

    it('has different content based on nav key', () => {
      const shallowRenderComponent = (navKey) => (
        shallow(
          <DigitalTerrainWebView
            selectedNavKey={navKey}
            handleNavMenuClick={() => {}}
            navigateToNewPage={() => {}}
            homeCachedImages={[]}
            setCachedHomeImages={() => {}}
            galleryCachedImages={[]}
            setCachedGalleryImages={() => {}}
          />,
        )
      );
      expect(view.find('HomeContainer')).toHaveLength(1); // default case
      expect(shallowRenderComponent('gallery').find('GalleryContainer')).toHaveLength(1);
      expect(shallowRenderComponent('map').find('MapContainer')).toHaveLength(1);
      expect(shallowRenderComponent('rules').find('RulesContainer')).toHaveLength(1);
      expect(shallowRenderComponent('info').find('ServerInformationContainer')).toHaveLength(1);
      expect(shallowRenderComponent('apply').find('ApplyContainer')).toHaveLength(1);
      expect(shallowRenderComponent('about').find('AboutUsContainer')).toHaveLength(1);
      expect(shallowRenderComponent('admin').find('AdminContainer')).toHaveLength(1);
      expect(shallowRenderComponent('default').find('HomeContainer')).toHaveLength(1);
    });
  });
});
