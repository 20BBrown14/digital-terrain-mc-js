import React from 'react';
import ServerInformationContainer from '../../../../src/components/pages/server_information/ServerInformationContainer';
import serverInformationService from '../../../../src/components/pages/server_information/service';

jest.mock('../../../../src/components/pages/server_information/service')

describe('ServerInformationContainer', () => {
  it('renders a default view', () => {
    const container = render(<ServerInformationContainer />);
    expect(container).toMatchSnapshot();
  });

  it('has a ServerInformationView', () => {
    const container = shallow(<ServerInformationContainer />);
    expect(container.find('ServerInformationView')).toHaveLength(1);
  });

  it('has a default state', () => {
    const container = shallow(<ServerInformationContainer />).instance();
    const expectedState = {
      isLoading: true,
      hasServiceFailure: false,
      serverInformation: {},
    };

    expect(container.state).toEqual(expectedState);
  });

  describe('componentDidMount', () => {
    it('calls server information service', () => {
      const container = shallow(<ServerInformationContainer />).instance();
      serverInformationService.mockClear();

      container.componentDidMount();
      expect(serverInformationService).toHaveBeenCalledTimes(1);
    });

    describe('successful service call', () => {
      it('sets state as expected', () => {
        const container = shallow(<ServerInformationContainer />).instance();
        serverInformationService.mockClear();
        serverInformationService.mockImplementation((success) => {
          success({ serverInformation: [] });
        });
        container.state.isLoading = true;
        container.componentDidMount();

        expect(container.state.isLoading).toEqual(false);
        expect(container.state.serverInformation).toEqual({ serverInformation: [] });
      });
    });

    describe('failed service call', () => {
      it('sets state as expected', () => {
        const container = shallow(<ServerInformationContainer />).instance();
        serverInformationService.mockClear();
        serverInformationService.mockImplementation((success, failure) => {
          failure();
        });
        container.state.isLoading = true;
        container.componentDidMount();

        expect(container.state.isLoading).toEqual(false);
        expect(container.state.hasServiceFailure).toEqual(true);
      });
    });
  });
});
