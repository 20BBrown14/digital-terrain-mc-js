import React from 'react';
import ServerInformationView from './ServerInformationView';
import retrieveServerInformation from './service';

/**
 * Server information page container.
 */
class ServerInformationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      hasServiceFailure: false,
      serverInformation: {},
    };
  }

  componentDidMount() {
    const successfulCall = (responseJSON) => {
      this.setState({
        isLoading: false,
        serverInformation: responseJSON,
      });
    };

    const failedCall = () => {
      this.setState({
        isLoading: false,
        hasServiceFailure: true,
      });
    };

    retrieveServerInformation(successfulCall, failedCall);
  }

  render() {
    const {
      isLoading,
      hasServiceFailure,
      serverInformation,
    } = this.state;

    return (
      <ServerInformationView
        isLoading={isLoading}
        hasServiceFailure={hasServiceFailure}
        serverInformation={serverInformation}
      />
    );
  }
}

export default ServerInformationContainer;
