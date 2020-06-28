import React from 'react';
import HomeContainer from '../../../../src/components/pages/home/HomeContainer';

describe('HomeContainer', () => {
  it('renders a default view', () => {
    const container = render(<HomeContainer navigateToNewPage={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  it('has a HomeView', () => {
    const container = shallow(<HomeContainer navigateToNewPage={() => {}} />);
    expect(container.find('HomeView')).toHaveLength(1);
  });
});