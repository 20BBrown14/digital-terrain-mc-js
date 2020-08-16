import React from 'react';
import ApplyView from './ApplyView';
import applicationSubmitService from './service';

/**
 * Apply page container.
 */
class ApplyContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      failedSubmission: false,
      successfulSubmission: false,
      sourceOption: '',
      sourceText: '',
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSourceTextChange = this.handleSourceTextChange.bind(this);
    this.handleSourceOptionChange = this.handleSourceOptionChange.bind(this);
  }

  handleFormSubmit(application) {
    const { sourceOption, sourceText } = this.state;

    const successfulCall = () => {
      this.setState({
        isLoading: false,
        failedSubmission: false,
        successfulSubmission: true,
      });
    };

    const failedCall = () => {
      this.setState({
        isLoading: false,
        failedSubmission: true,
        successfulSubmission: false,
      });
    };

    this.setState(
      {
        isLoading: true,
        failedSubmission: false,
        successfulSubmission: false,
      },
      applicationSubmitService(
        successfulCall,
        failedCall,
        { ...application, source: { option: sourceOption, text: sourceText } },
      ),
    );
  }

  handleSourceOptionChange(option) {
    this.setState({
      sourceOption: option,
    });
  }

  handleSourceTextChange(changeEvent) {
    this.setState({
      sourceText: changeEvent.target.value,
    });
  }

  render() {
    const { isLoading, failedSubmission, successfulSubmission } = this.state;
    return (
      <ApplyView
        handleFormSubmit={this.handleFormSubmit}
        isLoading={isLoading}
        failedSubmission={failedSubmission}
        successfulSubmission={successfulSubmission}
        handleSourceTextChange={this.handleSourceTextChange}
        handleSourceOptionChange={this.handleSourceOptionChange}
      />
    );
  }
}

export default ApplyContainer;
