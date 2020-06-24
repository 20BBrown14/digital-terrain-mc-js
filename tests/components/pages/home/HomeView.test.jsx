import React from 'react';
import HomeView from '../../../../src/components/pages/home/HomeView';

describe('HomeView', () => {
  it('renders a default view', () => {
    const view = render(<HomeView />);
    expect(view).toMatchSnapshot();
  });
});
