import React from 'react';
import AboutUsView from '../../../../src/components/pages/about_us/AboutUsView';

describe('AboutUsView', () => {
  describe('view states', () => {
    it('renders a default view', () => {
      const view = render(
        <AboutUsView
          isLoading={false}
          hasServiceFailure={false}
          aboutUsInformation={{}}
          veteransInformation={[]}
        />,
      );
      expect(view).toMatchSnapshot();
    });

    it('renders a loading view', () => {
      const view = render(
        <AboutUsView
          isLoading
          hasServiceFailure={false}
          aboutUsInformation={{}}
          veteransInformation={[]}
        />,
      );

      expect(view).toMatchSnapshot();
    });

    it('renders an error view', () => {
      const view = render(
        <AboutUsView
          isLoading={false}
          hasServiceFailure
          aboutUsInformation={{}}
          veteransInformation={[]}
        />,
      );

      expect(view).toMatchSnapshot();
    });
  });
});
