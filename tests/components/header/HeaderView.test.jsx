import React from 'react';
import HeaderView from '../../../src/components/header/HeaderView';

describe('HeaderView', () => {
  let view;
  beforeEach(() => {
    view = shallow(<HeaderView />);
  });

  it('renders a default view', () => {
    view = render(<HeaderView />);
    expect(view).toMatchSnapshot();
  });

  it('has a menu', () => {
    const menu = view.find('Menu');
    const menuItems = view.find('MenuItem');
    expect(menu).toHaveLength(1);
    expect(menuItems).toHaveLength(9);
  });
});
