import React from 'react';
import ErrorScreen from '../../../src/components/pages/ErrorScreen';

describe('ErrorScreen', () => {
  it('renders a default view', () => {
    const errorScreen = shallow(<ErrorScreen />);
    expect(errorScreen).toMatchSnapshot();
  });
});
