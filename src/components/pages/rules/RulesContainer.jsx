import React from 'react';
import RulesView from './RulesView';
import retrieveRulesInformation from './service';

/**
 * Rules page container.
 */
class RulesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesInformation: {},
      hasServiceFailure: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    const successfulCall = (responseData) => {
      this.setState({
        rulesInformation: responseData,
        isLoading: false,
      });
    };

    const failedCall = () => {
      this.setState({
        hasServiceFailure: true,
        isLoading: false,
      });
    };

    retrieveRulesInformation(successfulCall, failedCall);
  }

  render() {
    const { rulesInformation, hasServiceFailure, isLoading } = this.state;
    return (
      <RulesView
        rulesInformation={rulesInformation}
        hasServiceFailure={hasServiceFailure}
        isLoading={isLoading}
      />
    );
  }
}

export default RulesContainer;
