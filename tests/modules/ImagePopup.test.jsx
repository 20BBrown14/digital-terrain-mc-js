import React from 'react';
import ImagePopup from '../../src/modules/ImagePopup';

describe('ImagePopup', () => {
  it('renders a default view', () => {
    const wrapper = render(<ImagePopup isModalVisible closeModal={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when there are images to show', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <ImagePopup
          isModalVisible
          closeModal={() => {}}
          images={[{}, {}, {}, {}]}
        />,
      );
    });
    it('has a modal', () => {
      expect(wrapper.find('Modal')).toHaveLength(1);
    });

    it('has a grid', () => {
      expect(wrapper.find('Row')).toHaveLength(1);
      expect(wrapper.find('Col')).toHaveLength(3);
    });

    it('has two buttons', () => {
      expect(wrapper.find('Button')).toHaveLength(2);
    });

    it('has a carousel', () => {
      expect(wrapper.find('Carousel')).toHaveLength(1);
    });

    it('has images', () => {
      expect(wrapper.find('img')).toHaveLength(4);
    });
  });

  describe('componentDidUpdate', () => {
    let wrapper;
    let mockCarouselRef;
    beforeEach(() => {
      wrapper = shallow(
        <ImagePopup
          isModalVisible
          closeModal={() => {}}
          images={[{}, {}, {}, {}]}
          carouselIndexStart={3}
        />,
      );
      mockCarouselRef = { goTo: jest.fn() };
    });

    it('calls goto if carousel ref is set', () => {
      wrapper.instance().carousel = mockCarouselRef;
      wrapper.instance().componentDidUpdate();
      expect(mockCarouselRef.goTo).toHaveBeenCalledTimes(1);
      expect(mockCarouselRef.goTo).toHaveBeenCalledWith(3);
    });
  });

  describe('createCarouselRef', () => {
    it('sets carousel ref', () => {
      const wrapper = shallow(<ImagePopup isModalVisible closeModal={() => {}} images={[{}, {}, {}, {}]} />);
      wrapper.instance().createCarouselRef('someRef');
      expect(wrapper.instance().carousel).toEqual('someRef');
    });
  });

  describe('carousel nav buttons', () => {
    let wrapper;
    let mockCarouselRef;
    beforeEach(() => {
      wrapper = shallow(
        <ImagePopup
          isModalVisible
          closeModal={() => {}}
          images={[{}, {}, {}, {}]}
          carouselIndexStart={3}
        />,
      );
      mockCarouselRef = { next: jest.fn(), prev: jest.fn() };
      wrapper.instance().carousel = mockCarouselRef;
    });

    it('calls previous when prev button is clicked', () => {
      wrapper.find('Button').at(0).simulate('click');
      expect(mockCarouselRef.prev).toHaveBeenCalledTimes(1);
    });

    it('calls next when next button is clicked', () => {
      wrapper.find('Button').at(1).simulate('click');
      expect(mockCarouselRef.next).toHaveBeenCalledTimes(1);
    });
  });
});
