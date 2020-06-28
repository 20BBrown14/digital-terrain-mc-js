import React from 'react';
import ServerInformationView from '../../../../src/components/pages/server_information/ServerInformationView';

describe('ServerInformationView', () => {
  it('renders a default view', () => {
    const view = render(<ServerInformationView />);
    expect(view).toMatchSnapshot();
  });

  describe('expected components', () => {
    let view;
    beforeEach(() => {
      view = shallow(<ServerInformationView />);
    });

    it('has a title', () => {
      expect(view.find('Title')).toHaveLength(1);
    });

    it('has panels', () => {
      expect(view.find('CollapsePanel')).toHaveLength(12);
    });
  });
});
