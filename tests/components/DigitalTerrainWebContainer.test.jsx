import React from 'react';
import {
  NK_HOME,
  NK_MAP,
} from '../../src/constants/navKeys';
import DigitalTerrainWebContainer from '../../src/components/DigitalTerrainWebContainer';

describe('DigitalTerrainWebContainer', () => {
  let container;
  beforeEach(() => {
    container = shallow(<DigitalTerrainWebContainer selectedNavKey={NK_HOME} />);
  });

  it('renders a default component', () => {
    container = render(<DigitalTerrainWebContainer selectedNavKey={NK_HOME} />);
    expect(container).toMatchSnapshot();
  });

  it('has a DigitalTerrainWebView', () => {
    const view = container.find('DigitalTerrainWebView');
    expect(view).toHaveLength(1);
  });

  it('sets default state', () => {
    expect(container.instance().state.selectedNavKey).toEqual(NK_HOME);
    expect(container.instance().state.homeCachedImages).toEqual([]);
    expect(container.instance().state.galleryCachedImages).toEqual([]);
  });

  describe('handleNavMenuClick', () => {
    let instance;
    beforeEach(() => {
      instance = container.instance();
    });

    it('calls navigation function', () => {
      instance.navigateToNewPage = jest.fn();
      instance.handleNavMenuClick(NK_MAP);
      expect(instance.navigateToNewPage).toHaveBeenCalledTimes(1);
      expect(instance.navigateToNewPage).toHaveBeenCalledWith(NK_MAP);
    });
  });

  describe('navigateToNewPage', () => {
    let instance;
    beforeEach(() => {
      instance = container.instance();
    });

    it('sets selectedNavKey to passed key', () => {
      expect(instance.state.selectedNavKey).toEqual(NK_HOME);
      instance.navigateToNewPage(NK_MAP);
      expect(instance.state.selectedNavKey).toEqual(NK_MAP);
    });

    it('sets selectedNavKey to home when passed title', () => {
      instance.state.selectedNavKey = NK_MAP;
      instance.navigateToNewPage('title');
      expect(instance.state.selectedNavKey).toEqual(NK_HOME);
    });
  });

  describe('setCachedHomeImages', () => {
    let instance;
    beforeEach(() => {
      instance = container.instance();
    });

    it('sets state as expected', () => {
      instance.setCachedHomeImages([{}, {}, {}, {}]);
      expect(instance.state.homeCachedImages).toEqual([{}, {}, {}, {}]);
    });
  });

  describe('setCachedGalleryImages', () => {
    let instance;
    beforeEach(() => {
      instance = container.instance();
    });

    it('sets state as expected', () => {
      instance.setCachedGalleryImages([{}, {}, {}, {}]);
      expect(instance.state.galleryCachedImages).toEqual([{}, {}, {}, {}]);
    });
  });
});
