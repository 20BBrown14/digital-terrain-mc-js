import React from 'react';
import HeaderContainer from '../../../src/components/header/HeaderContainer';

describe('HeaderContainer', () => {
  let container;
  beforeEach(() => {
    container = shallow(<HeaderContainer selectedNavKey="home" handleNavMenuClick={() => {}} />);
  });

  it('renders a default view', () => {
    container = render(<HeaderContainer selectedNavKey="home" handleNavMenuClick={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  it('it has a view', () => {
    const view = container.find('HeaderView');
    expect(view).toHaveLength(1);
  });
});
