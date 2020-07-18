import React from 'react';
import LoadingScreen from '../../../src/components/pages/LoadingScreen';

describe('LoadingScreen', () => {
  it('renders a default view', () => {
    const loadingScreen = shallow(<LoadingScreen />);
    expect(loadingScreen).toMatchSnapshot();
  });
});
