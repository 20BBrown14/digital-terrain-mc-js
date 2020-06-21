import React from 'react';
import ServerInformationContainer from '../../../../src/components/pages/server_information/ServerInformationContainer';

describe('ServerInformationContainer', () => {
  it('renders a default view', () => {
    const container = render(<ServerInformationContainer />);
    expect(container).toMatchSnapshot();
  });

  it('has a ServerInformationView', () => {
    const container = shallow(<ServerInformationContainer />);
    expect(container.find('ServerInformationView')).toHaveLength(1);
  });
});
