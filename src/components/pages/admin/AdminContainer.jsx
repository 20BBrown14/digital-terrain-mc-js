import React from 'react';
import AdminView from './AdminView';
import rulesService from '../rules/service';
import serverInformationService from '../server_information/service';
import aboutUsInformationService from '../about_us/service';
import {
  saveJSONInformationService,
  loadAppsService,
  updateAppStatusService,
  deleteAppService,
} from './service';

class AdminContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedJSON: '',
      EdittedJSON: {},
      isJSONLoading: false,
      isSaveFailed: false,
      isDirty: false,
      isDiscardChangesModalOpen: false,
      tentativeSelectedJSON: '',
      jsonEditError: undefined,
      isSaveLoading: false,
      isSaveSuccessful: false,
      isAppsLoading: false,
      appData: [],
      appsLoadError: undefined,
      isViewModalOpen: false,
      selectedAppToView: {},
      isAppStatusUpdateSuccessful: false,
      isAppStatusUpdateFailed: false,
      isAppDeleteSuccessful: false,
      isAppDeleteFailed: false,
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
    this.handleAppsLoadClick = this.handleAppsLoadClick.bind(this);
    this.handleAppViewClick = this.handleAppViewClick.bind(this);
    this.handleAppViewGoBackClick = this.handleAppViewGoBackClick.bind(this);
    this.handleAppViewDenyClick = this.handleAppViewDenyClick.bind(this);
    this.handleAppViewApproveClick = this.handleAppViewApproveClick.bind(this);
    this.handleApprovedAppsButtonClick = this.handleApprovedAppsButtonClick.bind(this);
    this.handleDeniedAppsButtonClick = this.handleDeniedAppsButtonClick.bind(this);
    this.handleUnreviewedAppsButtonClick = this.handleUnreviewedAppsButtonClick.bind(this);
    this.loadApps = this.loadApps.bind(this);
    this.updateAppStatus = this.updateAppStatus.bind(this);
    this.handleAppDeleteButtonClick = this.handleAppDeleteButtonClick.bind(this);
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
        isSaveFailed: false,
        isSaveSuccessful: true,
      }, () => { this.jsonEditor.set({}); this.jsonEditor.setMode('tree'); });
    };

    const failedCall = (jsonEditError) => {
      this.setState({
        isSaveFailed: true,
        jsonEditError,
        isSaveLoading: false,
      });
      this.jsonEditor.setMode('tree');
    };
    if (selectedJSON) {
      this.jsonEditor.setMode('view');
      saveJSONInformationService(successfulCall, failedCall, selectedJSON, EdittedJSON);
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
          isSaveFailed: false,
          selectedJSON: prevState.tentativeSelectedJSON,
          tentativeSelectedJSON: '',
          isSaveSuccessful: false,
        };
      });
      this.jsonEditor.set(responseJSON);
      this.jsonEditor.setMode('tree');
    };

    const failedCall = (jsonEditError) => {
      this.setState({
        jsonEditError,
        isJSONLoading: false,
        isSaveFailed: true,
        isSaveSuccessful: false,
      });
      this.jsonEditor.setMode('tree');
    };

    const loadCachedJSON = (cachedJSON) => {
      this.setState((prevState) => ({
        isJSONLoading: false,
        isSaveFailed: false,
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
          isSaveFailed: true,
          jsonEditError: { message: 'Unexpected value for json to edit' },
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

  loadApps = (filter) => {
    const successfulCall = (data) => {
      this.setState({
        appData: data,
        isAppsLoading: false,
        appsLoadError: undefined,
      });
    };

    const failedCall = (error) => {
      this.setState({
        isAppsLoading: false,
        appsLoadError: error,
      });
    };

    this.setState({
      isAppsLoading: true,
    }, loadAppsService(successfulCall, failedCall, filter));
  }

  handleUnreviewedAppsButtonClick = () => {
    this.loadApps('submitted');
  }

  handleApprovedAppsButtonClick = () => {
    this.loadApps('approved');
  }

  handleDeniedAppsButtonClick = () => {
    this.loadApps('denied');
  }

  handleAppsLoadClick = () => {
    this.loadApps('submitted');
  }

  handleAppViewClick = (id) => {
    this.setState((prevState) => {
      const selectedAppData = prevState.appData.find((app) => (
        app.appID === id
      ));
      return {
        isViewModalOpen: true,
        selectedAppToView: selectedAppData,
      };
    });
  }

  handleAppViewGoBackClick = () => {
    this.setState({
      isViewModalOpen: false,
    });
  }

  updateAppStatus = (appID, newStatus) => {
    const successfulCall = () => {
      this.setState((prevState) => {
        let newAppData = [...prevState.appData];
        newAppData = newAppData.map((app) => {
          const newApp = { ...app };
          if (newApp.appID === appID) {
            newApp.status = newStatus;
          }
          return newApp;
        });
        return {
          isAppsLoading: false,
          isAppStatusUpdateSuccessful: true,
          isAppStatusUpdateFailed: false,
          selectedAppToView: {},
          appData: newAppData,
        };
      });
    };

    const failedCall = (error) => {
      this.setState({
        isAppsLoading: false,
        isAppStatusUpdateSuccessful: false,
        isAppStatusUpdateFailed: true,
        appUpdateStatusError: error,
      });
    };

    this.setState({
      isAppsLoading: true,
      isViewModalOpen: false,
      isAppDeleteSuccessful: false,
      isAppDeleteFailed: false,
    }, updateAppStatusService(successfulCall, failedCall, appID, newStatus));
  }

  handleAppViewApproveClick = (appID) => {
    this.updateAppStatus(appID, 'approved');
  }

  handleAppViewDenyClick = (appID) => {
    this.updateAppStatus(appID, 'denied');
  }

  handleAppDeleteButtonClick = (appID) => {
    const successfulCall = () => {
      this.setState((prevState) => {
        const newAppData = prevState.appData.filter((app) => !(app.appID === appID));
        return {
          isAppsLoading: false,
          isAppDeleteSuccessful: true,
          isAppDeleteFailed: false,
          selectedAppToView: {},
          appData: newAppData,
        };
      });
    };

    const failedCall = (error) => {
      this.setState({
        isAppsLoading: false,
        isAppDeleteSuccessful: false,
        isAppDeleteFailed: true,
        appDeleteError: error,
      });
    };

    this.setState({
      isAppsLoading: true,
      isViewModalOpen: false,
      isAppStatusUpdateSuccessful: false,
      isAppStatusUpdateFailed: false,
    }, deleteAppService(successfulCall, failedCall, appID));
  }

  render() {
    const {
      selectedJSON,
      isJSONLoading,
      isDiscardChangesModalOpen,
      isSaveLoading,
      isSaveFailed,
      jsonEditError,
      isSaveSuccessful,
      tentativeSelectedJSON,
      isAppsLoading,
      appData,
      appsLoadError,
      isViewModalOpen,
      selectedAppToView,
      isAppStatusUpdateSuccessful,
      isAppStatusUpdateFailed,
      appUpdateStatusError,
      isAppDeleteSuccessful,
      isAppDeleteFailed,
      appDeleteError,
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
        isSaveFailed={isSaveFailed}
        jsonEditError={jsonEditError}
        isSaveSuccessful={isSaveSuccessful}
        tentativeSelectedJSON={tentativeSelectedJSON}
        handleAppsLoadClick={this.handleAppsLoadClick}
        isAppsLoading={isAppsLoading}
        appData={appData}
        appsLoadError={appsLoadError}
        isViewModalOpen={isViewModalOpen}
        selectedAppToView={selectedAppToView}
        handleAppViewClick={this.handleAppViewClick}
        handleAppViewGoBackClick={this.handleAppViewGoBackClick}
        handleAppViewDenyClick={this.handleAppViewDenyClick}
        handleAppViewApproveClick={this.handleAppViewApproveClick}
        handleApprovedAppsButtonClick={this.handleApprovedAppsButtonClick}
        handleDeniedAppsButtonClick={this.handleDeniedAppsButtonClick}
        handleUnreviewedAppsButtonClick={this.handleUnreviewedAppsButtonClick}
        isAppStatusUpdateSuccessful={isAppStatusUpdateSuccessful}
        isAppStatusUpdateFailed={isAppStatusUpdateFailed}
        appUpdateStatusError={appUpdateStatusError}
        isAppDeleteSuccessful={isAppDeleteSuccessful}
        isAppDeleteFailed={isAppDeleteFailed}
        appDeleteError={appDeleteError}
        handleAppDeleteButtonClick={this.handleAppDeleteButtonClick}
      />
    );
  }
}

export default AdminContainer;
