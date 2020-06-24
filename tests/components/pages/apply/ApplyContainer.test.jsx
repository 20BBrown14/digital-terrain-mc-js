import React from 'react';
import ApplyContainer from '../../../../src/components/pages/apply/ApplyContainer';

describe('ApplyContainer', () => {
  it('renders a default view', () => {
    const container = render(<ApplyContainer />);
    expect(container).toMatchSnapshot();
  });

  it('has an ApplyView', () => {
    const container = shallow(<ApplyContainer />);
    expect(container.find('ApplyView')).toHaveLength(1);
  });
});
