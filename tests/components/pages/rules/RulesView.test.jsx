import React from 'react';
import RulesView from '../../../../src/components/pages/rules/RulesView';

describe('RulesView', () => {
  const mockRulesData = { test: [] };
  it('renders a default view', () => {
    const view = render(<RulesView rulesInformation={mockRulesData} isLoading={false} hasServiceFailure={false} />);
    expect(view).toMatchSnapshot();
  });

  it('has a collapse', () => {
    const view = shallow(<RulesView rulesInformation={mockRulesData} isLoading={false} hasServiceFailure={false} />);
    expect(view.find('Collapse')).toHaveLength(1);
  });
});
