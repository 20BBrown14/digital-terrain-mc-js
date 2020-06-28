import React from 'react';
import HomeView from '../../../../src/components/pages/home/HomeView';
import {
  NK_ABOUT_US,
  NK_GALLERY,
  NK_MAP,
  NK_APPLY,
} from '../../../../src/constants/navKeys';

describe('HomeView', () => {
  it('renders a default view', () => {
    const view = render(<HomeView navigateToNewPage={() => {}} />);
    expect(view).toMatchSnapshot();
  });

  it('has expected components', () => {
    const view = shallow(<HomeView navigateToNewPage={() => {}} />);
    expect(view.find('Title')).toHaveLength(1);
    expect(view.find('Text')).toHaveLength(2);
    expect(view.find('Carousel')).toHaveLength(1);
    expect(view.find('img')).toHaveLength(5);
  });

  describe('in-text links', () => {
    let view;
    let navigateToNewPageMock;
    beforeEach(() => {
      navigateToNewPageMock = jest.fn();
      view = shallow(<HomeView navigateToNewPage={navigateToNewPageMock} />);
    });

    afterEach(() => {
      navigateToNewPageMock.mockClear();
    });

    it('panda link navigates to correct page on click', () => {
      view.find('#pandaLink').simulate('click');
      expect(navigateToNewPageMock).toHaveBeenCalledTimes(1);
      expect(navigateToNewPageMock).toHaveBeenCalledWith(NK_ABOUT_US);
    });

    it('dm link navigates to correct page on click', () => {
      view.find('#dmLink').simulate('click');
      expect(navigateToNewPageMock).toHaveBeenCalledTimes(1);
      expect(navigateToNewPageMock).toHaveBeenCalledWith(NK_ABOUT_US);
    });

    it('gallery link navigates to correct page on click', () => {
      view.find('#galleryLink').simulate('click');
      expect(navigateToNewPageMock).toHaveBeenCalledTimes(1);
      expect(navigateToNewPageMock).toHaveBeenCalledWith(NK_GALLERY);
    });

    it('map link navigates to correct page on click', () => {
      view.find('#mapLink').simulate('click');
      expect(navigateToNewPageMock).toHaveBeenCalledTimes(1);
      expect(navigateToNewPageMock).toHaveBeenCalledWith(NK_MAP);
    });

    it('apply link navigates to correct page on click', () => {
      view.find('#applyLink').simulate('click');
      expect(navigateToNewPageMock).toHaveBeenCalledTimes(1);
      expect(navigateToNewPageMock).toHaveBeenCalledWith(NK_APPLY);
    });

    it('panda link navigates to correct page on key press', () => {
      view.find('#pandaLink').simulate('keypress', { key: 'Enter' });
      expect(navigateToNewPageMock).toHaveBeenCalledTimes(1);
      expect(navigateToNewPageMock).toHaveBeenCalledWith(NK_ABOUT_US);
    });

    it('dm link navigates to correct page on key press', () => {
      view.find('#dmLink').simulate('keypress', { key: 'Enter' });
      expect(navigateToNewPageMock).toHaveBeenCalledTimes(1);
      expect(navigateToNewPageMock).toHaveBeenCalledWith(NK_ABOUT_US);
    });

    it('gallery link navigates to correct page on key press', () => {
      view.find('#galleryLink').simulate('keypress', { key: 'Enter' });
      expect(navigateToNewPageMock).toHaveBeenCalledTimes(1);
      expect(navigateToNewPageMock).toHaveBeenCalledWith(NK_GALLERY);
    });

    it('map link navigates to correct page on key press', () => {
      view.find('#mapLink').simulate('keypress', { key: 'Enter' });
      expect(navigateToNewPageMock).toHaveBeenCalledTimes(1);
      expect(navigateToNewPageMock).toHaveBeenCalledWith(NK_MAP);
    });

    it('apply link navigates to correct page on key press', () => {
      view.find('#applyLink').simulate('keypress', { key: 'Enter' });
      expect(navigateToNewPageMock).toHaveBeenCalledTimes(1);
      expect(navigateToNewPageMock).toHaveBeenCalledWith(NK_APPLY);
    });
  });
});
