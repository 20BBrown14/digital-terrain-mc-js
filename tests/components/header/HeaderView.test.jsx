import React from 'react';
import HeaderView from '../../../src/components/header/HeaderView';

describe('HeaderView', () => {
  let view;
  beforeEach(() => {
    view = shallow(
      <HeaderView
        selectedNavKey="home"
        handleNavMenuClick={() => {}}
        showTitle={true}
      />
    );
  });

  it('renders a default view', () => {
    view = render(
      <HeaderView
        selectedNavKey="home"
        handleNavMenuClick={() => {}}
        showTitle={true}
      />
    );
    expect(view).toMatchSnapshot();
  });

  it('has a menu', () => {
    const menu = view.find('Menu');
    const menuItems = view.find('MenuItem');
    expect(menu).toHaveLength(1);
    expect(menuItems).toHaveLength(10);
  });

  it('calls nav menu click handler when menu is clicked', () => {
    const mockHandleNavMenuClick = jest.fn();
    view = shallow(
      <HeaderView
        selectedNavKey="home"
        handleNavMenuClick={mockHandleNavMenuClick}
        showTitle={true}
      />
    );
    view.find('Menu').at(0).simulate('click', { key: 'map' });
    expect(mockHandleNavMenuClick).toHaveBeenCalledTimes(1);
    expect(mockHandleNavMenuClick).toHaveBeenCalledWith('map');
  });
});
