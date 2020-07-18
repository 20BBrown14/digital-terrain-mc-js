import React from 'react';
import ServerInformationView from '../../../../src/components/pages/server_information/ServerInformationView';

describe('ServerInformationView', () => {
  it('renders a default view', () => {
    const view = render(
      <ServerInformationView
        isLoading={false}
        hasServiceFailure={false}
      />
    );
    expect(view).toMatchSnapshot();
  });
});
