import React from 'react';
import HeaderView from '../../../src/components/header/HeaderView';

describe('HeaderView', () => {
  let view;
  beforeEach(() => {
    view = shallow(<HeaderView selectedNavKey="home" handleNavMenuClick={() => {}} />);
  });

  it('renders a default view', () => {
    view = render(<HeaderView selectedNavKey="home" handleNavMenuClick={() => {}} />);
    expect(view).toMatchSnapshot();
  });

  it('has a menu', () => {
    const menu = view.find('Menu');
    const menuItems = view.find('MenuItem');
    expect(menu).toHaveLength(1);
    expect(menuItems).toHaveLength(9);
  });

  it('calls nav menu click handler when menu is clicked', () => {
    const mockHandleNavMenuClick = jest.fn();
    view = shallow(<HeaderView selectedNavKey="home" handleNavMenuClick={mockHandleNavMenuClick} />);
    view.find('Menu').at(0).simulate('click');
    expect(mockHandleNavMenuClick).toHaveBeenCalledTimes(1);
  });
});
