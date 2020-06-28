import React from 'react';
import RulesView from '../../../../src/components/pages/rules/RulesView';

describe('RulesView', () => {
  it('renders a default view', () => {
    const view = render(<RulesView />);
    expect(view).toMatchSnapshot();
  });

  it('has a collapse', () => {
    const view = shallow(<RulesView />);
    expect(view.find('Collapse')).toHaveLength(1);
  });
});
