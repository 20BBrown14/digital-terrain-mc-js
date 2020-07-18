import React from 'react';
import AboutUsContainer from '../../../../src/components/pages/about_us/AboutUsContainer';
import aboutUsService from '../../../../src/components/pages/about_us/service';

jest.mock('../../../../src/components/pages/about_us/service');

describe('AboutUsContainer', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders a default view', () => {
    const container = render(<AboutUsContainer />);
    expect(container).toMatchSnapshot();
  });

  it('has an AboutUsView', () => {
    const container = shallow(<AboutUsContainer />);
    expect(container.find('AboutUsView')).toHaveLength(1);
  });

  describe('componentDidMount', () => {
    let container;
    beforeEach(() => {
      aboutUsService.retrieveAboutUsInformation = jest.fn();
      aboutUsService.retrieveVeteransInformation = jest.fn();
      container = shallow(<AboutUsContainer />).instance();
      aboutUsService.retrieveAboutUsInformation.mockClear();
      aboutUsService.retrieveVeteransInformation.mockClear();
    })

    afterEach(() => {
      aboutUsService.retrieveAboutUsInformation.mockClear();
      aboutUsService.retrieveVeteransInformation.mockClear();
    })

    it('calls service', () => {
      container.componentDidMount();
      expect(aboutUsService.retrieveAboutUsInformation).toHaveBeenCalledTimes(1);
      expect(aboutUsService.retrieveVeteransInformation).toHaveBeenCalledTimes(1);
    });

    describe('successful service call', () => {
      describe('sets state on successful about us call', () => {
        beforeEach(() => {
          aboutUsService.retrieveAboutUsInformation.mockImplementation((success) => {
            success({ success: 'success' });
          });
        });

        it('sets isLoading to false if veterans is complete', () => {
          container.state.veteransInformation = ['a', 'b', 'c'];

          container.componentDidMount();
          expect(aboutUsService.retrieveAboutUsInformation).toHaveBeenCalledTimes(1);
          expect(container.state.isLoading).toBe(false);
          expect(container.state.aboutUsInformation).toEqual({ success: 'success' });
        })

        it('sets isLoading to true if veterans is not complete', () => {
          container.state.isLoading = false;

          container.componentDidMount();
          expect(aboutUsService.retrieveAboutUsInformation).toHaveBeenCalledTimes(1);
          expect(container.state.isLoading).toBe(true);
          expect(container.state.aboutUsInformation).toEqual({ success: 'success' });
        });
      });

      describe('sets state on successful veterans call', () => {
        beforeEach(() => {
          aboutUsService.retrieveVeteransInformation.mockImplementation((success) => {
            success(['success']);
          });
        });

        it('sets isLoading to false if about us is complete', () => {
          container.state.aboutUsInformation = { complete: 'complete' };

          container.componentDidMount();
          expect(aboutUsService.retrieveVeteransInformation).toHaveBeenCalledTimes(1);
          expect(container.state.isLoading).toBe(false);
          expect(container.state.veteransInformation).toEqual(['success']);
        });

        it('sets isLoading to true if about us is not complete', () => {
          container.state.isLoading = false;

          container.componentDidMount();
          expect(aboutUsService.retrieveVeteransInformation).toHaveBeenCalledTimes(1);
          expect(container.state.isLoading).toBe(true);
          expect(container.state.veteransInformation).toEqual(['success']);
        });
      });
    });

    describe('failed service call', () => {
      it('sets state as expected', () => {
        aboutUsService.retrieveAboutUsInformation.mockImplementation((success, failure) => {
          failure();
        });

        container.componentDidMount();
        expect(container.state.isLoading).toBe(false);
        expect(container.state.hasServiceFailure).toBe(true);
      });
    });
  });
});
