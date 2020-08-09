import React from 'react';
import AboutUsView from './AboutUsView';
import aboutUsServices from './service';

/**
 * About us page container.
 */
class AboutUsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutUsInformation: {},
      veteransInformation: [],
      isLoading: true,
      hasServiceFailure: false,
    };
  }

  componentDidMount() {
    const { retrieveAboutUsInformation, retrieveVeteransInformation } = aboutUsServices;

    const successfulAboutUsCall = (responseJSON) => {
      this.setState((prevState) => (
        {
          isLoading: !prevState.veteransInformation.length,
          aboutUsInformation: responseJSON,
        }
      ));
    };

    const successfulVeteransCall = (responseJSON) => {
      this.setState((prevState) => (
        {
          isLoading: !Object.keys(prevState.aboutUsInformation).length,
          veteransInformation: responseJSON,
        }
      ));
    };

    const failedCall = () => {
      this.setState({
        isLoading: false,
        hasServiceFailure: true,
      });
    };

    retrieveAboutUsInformation(successfulAboutUsCall, failedCall);
    retrieveVeteransInformation(successfulVeteransCall, failedCall);
  }

  render() {
    const {
      isLoading,
      hasServiceFailure,
      veteransInformation,
      aboutUsInformation,
    } = this.state;
    return (
      <AboutUsView
        isLoading={isLoading}
        hasServiceFailure={hasServiceFailure}
        veteransInformation={veteransInformation}
        aboutUsInformation={aboutUsInformation}
      />
    );
  }
}

export default AboutUsContainer;
