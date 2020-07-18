import React from 'react';
import AdminView from './AdminView';
import rulesService from '../rules/service';
import serverInformationService from '../server_information/service';
import aboutUsInformationService from '../about_us/service';
import saveService from './service';

class AdminContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedJSON: '',
      EdittedJSON: {},
      isJSONLoading: false,
      isFailed: false,
      isDirty: false,
      isDiscardChangesModalOpen: false,
      tentativeSelectedJSON: '',
      error: undefined,
      isSaveLoading: false,
      isSaveSuccessful: false,
    };

    this.cachedJSON = {
      rules: '',
      serverInformation: '',
      aboutUsInformation: '',
      veteransInformation: '',
    };

    this.handleEditJSONButton = this.handleEditJSONButton.bind(this);
    this.handleJSONEditorChange = this.handleJSONEditorChange.bind(this);
    this.getJSONEditorRef = this.getJSONEditorRef.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleYesSaveButtonClick = this.handleYesSaveButtonClick.bind(this);
    this.handleNoSaveButtonClick = this.handleNoSaveButtonClick.bind(this);
    this.handleGoBackSaveButtonClick = this.handleGoBackSaveButtonClick.bind(this);
    this.saveJSON = this.saveJSON.bind(this);
    this.loadNewJSON = this.loadNewJSON.bind(this);
  }

  getJSONEditorRef = (instance) => {
    if (instance) {
      this.jsonEditor = instance.jsonEditor;
    }
  }

  saveJSON = () => {
    const { selectedJSON, EdittedJSON } = this.state;

    const successfulCall = (savedJSON) => {
      this.cachedJSON[selectedJSON] = savedJSON;
      this.setState({
        isDirty: false,
        selectedJSON: '',
        tentativeSelectedJSON: '',
        EdittedJSON: {},
        isSaveLoading: false,
        isFailed: false,
        isSaveSuccessful: true,
      }, () => { this.jsonEditor.set({}); this.jsonEditor.setMode('tree'); });
    };

    const failedCall = (error) => {
      this.setState({
        isFailed: true,
        error,
        isSaveLoading: false,
      });
      this.jsonEditor.setMode('tree');
    };
    if (selectedJSON) {
      this.jsonEditor.setMode('view');
      saveService(successfulCall, failedCall, selectedJSON, EdittedJSON);
    }
  }

  handleJSONEditorChange = (JSON) => {
    this.setState({
      EdittedJSON: JSON,
      isDirty: true,
    });
  }

  loadNewJSON = () => {
    const { tentativeSelectedJSON } = this.state;

    this.jsonEditor.setMode('view');

    const successfulCall = (responseJSON) => {
      this.setState((prevState) => {
        this.cachedJSON[prevState.tentativeSelectedJSON] = responseJSON;
        return {
          isJSONLoading: false,
          isFailed: false,
          selectedJSON: prevState.tentativeSelectedJSON,
          tentativeSelectedJSON: '',
          isSaveSuccessful: false,
        };
      });
      this.jsonEditor.set(responseJSON);
      this.jsonEditor.setMode('tree');
    };

    const failedCall = (error) => {
      this.setState({
        error,
        isJSONLoading: false,
        isFailed: true,
        isSaveSuccessful: false,
      });
      this.jsonEditor.setMode('tree');
    };

    const loadCachedJSON = (cachedJSON) => {
      this.setState((prevState) => ({
        isJSONLoading: false,
        isFailed: false,
        selectedJSON: prevState.tentativeSelectedJSON,
        tentativeSelectedJSON: '',
        isSaveSuccessful: false,
      }));
      this.jsonEditor.set(cachedJSON);
      this.jsonEditor.setMode('tree');
    };

    switch (tentativeSelectedJSON) {
      case 'rules':
        this.setState({
          isJSONLoading: true,
        }, () => {
          const { rules } = this.cachedJSON;
          if (rules) {
            loadCachedJSON(rules);
          } else {
            rulesService(successfulCall, failedCall);
          }
        });
        return;
      case 'serverInformation':
        this.setState({
          isJSONLoading: true,
        }, () => {
          const { serverInformation } = this.cachedJSON;
          if (serverInformation) {
            loadCachedJSON(serverInformation);
          } else {
            serverInformationService(successfulCall, failedCall);
          }
        });
        return;
      case 'aboutUsInformation':
        this.setState({
          isJSONLoading: true,
        }, () => {
          const { aboutUsInformation } = this.cachedJSON;
          if (aboutUsInformation) {
            loadCachedJSON(aboutUsInformation);
          } else {
            aboutUsInformationService.retrieveAboutUsInformation(successfulCall, failedCall);
          }
        });
        return;
      case 'veteransInformation':
        this.setState({
          isJSONLoading: true,
        }, () => {
          const { veteransInformation } = this.cachedJSON;
          if (veteransInformation) {
            loadCachedJSON(veteransInformation);
          } else {
            aboutUsInformationService.retrieveVeteransInformation(successfulCall, failedCall);
          }
        });
        return;
      default:
        this.setState({
          isJSONLoading: false,
          isFailed: true,
          error: { message: 'Unexpected value for json to edit' },
        });
    }
  }

  handleEditJSONButton = (buttonClicked) => {
    const { isDirty } = this.state;
    if (isDirty) {
      this.setState({
        isDiscardChangesModalOpen: true,
        tentativeSelectedJSON: buttonClicked,
      });
    } else {
      this.setState({
        tentativeSelectedJSON: buttonClicked,
      }, this.loadNewJSON);
    }
  }

  handleSaveButtonClick = () => {
    const { isDirty } = this.state;

    if (isDirty) {
      this.setState({
        isSaveLoading: true,
      }, this.saveJSON);
    }
  }

  handleYesSaveButtonClick = () => {
    this.setState({
      isDiscardChangesModalOpen: false,
    }, () => { this.saveJSON(); this.loadNewJSON(); });
  }

  handleNoSaveButtonClick = () => {
    this.setState({
      isDirty: false,
      isDiscardChangesModalOpen: false,
    }, this.loadNewJSON);
  };

  handleGoBackSaveButtonClick = () => {
    this.setState({
      isDiscardChangesModalOpen: false,
    });
  }

  render() {
    const {
      selectedJSON,
      isJSONLoading,
      isDiscardChangesModalOpen,
      isSaveLoading,
      isFailed,
      error,
      isSaveSuccessful,
      tentativeSelectedJSON,
    } = this.state;
    return (
      <AdminView
        selectedJSON={selectedJSON}
        handleEditJSONButton={this.handleEditJSONButton}
        handleJSONEditorChange={this.handleJSONEditorChange}
        handleSaveButtonClick={this.handleSaveButtonClick}
        getJSONEditorRef={this.getJSONEditorRef}
        isJSONLoading={isJSONLoading}
        isDiscardChangesModalOpen={isDiscardChangesModalOpen}
        handleYesSaveButtonClick={this.handleYesSaveButtonClick}
        handleNoSaveButtonClick={this.handleNoSaveButtonClick}
        handleGoBackSaveButtonClick={this.handleGoBackSaveButtonClick}
        isSaveLoading={isSaveLoading}
        isFailed={isFailed}
        error={error}
        isSaveSuccessful={isSaveSuccessful}
        tentativeSelectedJSON={tentativeSelectedJSON}
      />
    );
  }
}

export default AdminContainer;
