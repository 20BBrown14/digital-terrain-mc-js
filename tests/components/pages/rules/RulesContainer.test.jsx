import React from 'react';
import RulesContainer from '../../../../src/components/pages/rules/RulesContainer';

describe('RulesContainer', () => {
  it('renders a default view', () => {
    const container = render(<RulesContainer />);
    expect(container).toMatchSnapshot();
  });

  it('has a RulesView', () => {
    const container = shallow(<RulesContainer />);
    expect(container.find('RulesView')).toHaveLength(1);
  });
});
