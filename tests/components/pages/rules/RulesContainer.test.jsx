import React from 'react';
import RulesContainer from '../../../../src/components/pages/rules/RulesContainer';
import service from '../../../../src/components/pages/rules/service';

jest.mock('../../../../src/components/pages/rules/service');

describe('RulesContainer', () => {
  afterEach(() => {
    service.mockClear();
  });

  it('renders a default view', () => {
    const container = shallow(<RulesContainer />);
    container.instance().state.isLoading = false;
    container.update();
    expect(container).toMatchSnapshot();
  });

  it('has a RulesView', () => {
    const container = shallow(<RulesContainer />);
    expect(container.find('RulesView')).toHaveLength(1);
  });

  describe('componentDidMount()', () => {
    it('calls service', () => {
      const container = shallow(<RulesContainer />).instance();
      service.mockClear();
      container.componentDidMount();
      expect(service).toHaveBeenCalledTimes(1);
    });

    describe('successful service', () => {
      it('sets state as expected', () => {
        const container = shallow(<RulesContainer />).instance();
        service.mockImplementation((success) => {
          success({ rules: [] });
        });
        container.state.isLoading = true;
        container.componentDidMount();

        expect(container.state.rulesInformation).toEqual({ rules: [] });
        expect(container.state.isLoading).toEqual(false);
      });
    });

    describe('failed service', () => {
      it('sets state as expected', () => {
        const container = shallow(<RulesContainer />).instance();
        service.mockImplementation((success, failed) => {
          failed();
        });
        container.state.isLoading = true;
        container.componentDidMount();

        expect(container.state.hasServiceFailure).toEqual(true);
        expect(container.state.isLoading).toEqual(false);
      });
    });
  });
});
