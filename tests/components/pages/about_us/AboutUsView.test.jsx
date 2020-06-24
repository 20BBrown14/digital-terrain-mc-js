import React from 'react';
import AboutUsView from '../../../../src/components/pages/about_us/AboutUsView';

describe('AboutUsView', () => {
  it('renders a default view', () => {
    const view = render(<AboutUsView />);
    expect(view).toMatchSnapshot();
  });
});
