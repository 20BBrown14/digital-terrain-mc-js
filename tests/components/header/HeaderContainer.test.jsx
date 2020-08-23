import React from 'react';
import HeaderContainer from '../../../src/components/header/HeaderContainer';

describe('HeaderContainer', () => {
  let container;
  beforeEach(() => {
    container = shallow(
      <HeaderContainer
        selectedNavKey="home"
        handleNavMenuClick={() => {}}
        discordNick=""
        isAdmin={false}
      />,
    );
  });

  it('renders a default view', () => {
    container = render(
      <HeaderContainer
        selectedNavKey="home"
        handleNavMenuClick={() => {}}
        discordNick=""
        isAdmin={false}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('it has a view', () => {
    const view = container.find('HeaderView');
    expect(view).toHaveLength(1);
  });

  describe('componentWillMount', () => {
    beforeEach(() => {
      container = shallow(
        <HeaderContainer
          selectedNavKey="home"
          handleNavMenuClick={() => {}}
          discordNick=""
          isAdmin={false}
        />,
      ).instance();
    });

    it('adds event listener and calls updateShowTitle', () => {
      container.updateShowTitle = jest.fn();
      window.addEventListener = jest.fn();
      container.componentDidMount();
      expect(container.updateShowTitle).toHaveBeenCalledTimes(1);
      expect(window.addEventListener).toHaveBeenCalledTimes(1);
      expect(window.addEventListener).toHaveBeenCalledWith('resize', container.updateShowTitle);
    });
  });

  describe('componentWillUnmount', () => {
    beforeEach(() => {
      container = shallow(
        <HeaderContainer
          selectedNavKey="home"
          handleNavMenuClick={() => {}}
          discordNick=""
          isAdmin={false}
        />,
      ).instance();
    });

    it('removes event listener', () => {
      window.removeEventListener = jest.fn();
      container.componentWillUnmount();
      expect(window.removeEventListener).toHaveBeenCalledTimes(1);
      expect(window.removeEventListener).toHaveBeenCalledWith('resize', container.updateShowTitle);
    });
  });

  describe('updateShowTitle', () => {
    beforeEach(() => {
      container = shallow(
        <HeaderContainer
          selectedNavKey="home"
          handleNavMenuClick={() => {}}
          discordNick=""
          isAdmin={false}
        />,
      ).instance();
    });

    describe('screen is less than 442 wide', () => {
      it('sets state as expected', () => {
        window.innerWidth = 200;
        container.updateShowTitle();
        expect(container.state.showTitle).toEqual(false);
      });
    });

    describe('screen is more than 422', () => {
      it('sets state as expected', () => {
        window.innerWidth = 500;
        container.updateShowTitle();
        expect(container.state.showTitle).toEqual(true);
      });
    });
  });
});
