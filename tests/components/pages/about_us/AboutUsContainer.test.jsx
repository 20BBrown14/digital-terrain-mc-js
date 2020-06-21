import React from 'react';
import AboutUsContainer from '../../../../src/components/pages/about_us/AboutUsContainer';

describe('AboutUsContainer', () => {
  it('renders a default view', () => {
    const container = render(<AboutUsContainer />);
    expect(container).toMatchSnapshot();
  });

  it('has an AboutUsView', () => {
    const container = shallow(<AboutUsContainer />);
    expect(container.find('AboutUsView')).toHaveLength(1);
  });
});
