import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Alert,
  Modal,
  Typography,
  List,
  Space,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { JsonEditor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import './Admin.css';

const propTypes = {
  /* The string indicating which json to edit is selected */
  selectedJSON: PropTypes.string,
  /* Function to handle json edit select buttons */
  handleEditJSONButton: PropTypes.func.isRequired,
  /* Function handle edittor on edit change */
  handleJSONEditorChange: PropTypes.func.isRequired,
  /* function to get the JSON editor ref */
  getJSONEditorRef: PropTypes.func.isRequired,
  /* Whether json is loading */
  isJSONLoading: PropTypes.bool.isRequired,
  /* Function to handle save button click */
  handleSaveButtonClick: PropTypes.func.isRequired,
  /* Is discard changes modal open */
  isDiscardChangesModalOpen: PropTypes.bool.isRequired,
  /* Handle yes save modal button click */
  handleYesSaveButtonClick: PropTypes.func.isRequired,
  /* Handle no save modal button click */
  handleNoSaveButtonClick: PropTypes.func.isRequired,
  /* Handle cancel save modal button click */
  handleGoBackSaveButtonClick: PropTypes.func.isRequired,
  /* Whether a save is in progress or not */
  isSaveLoading: PropTypes.bool.isRequired,
  /* Whether there was a service failure */
  isSaveFailed: PropTypes.bool.isRequired,
  /* jsonEditError information */
  /* eslint-disable-next-line react/forbid-prop-types */
  jsonEditError: PropTypes.object,
  /* Whether the save was successful */
  isSaveSuccessful: PropTypes.bool.isRequired,
  /* The tentatively selected button */
  tentativeSelectedJSON: PropTypes.string.isRequired,
  /* Function to trigger app loads */
  handleAppsLoadClick: PropTypes.func.isRequired,
  /* Whether apps are loading */
  isAppsLoading: PropTypes.bool.isRequired,
  /* Application data */
  appData: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* apps load error information */
  /* eslint-disable-next-line react/forbid-prop-types */
  appsLoadError: PropTypes.object,
  /* Function to handle app view button click */
  handleAppViewClick: PropTypes.func.isRequired,
  /* Whether view app modal is open */
  isViewModalOpen: PropTypes.bool.isRequired,
  /* Selected app to view */
  /* eslint-disable-next-line react/forbid-prop-types */
  selectedAppToView: PropTypes.object.isRequired,
  /* Function to handle app view modal go back click */
  handleAppViewGoBackClick: PropTypes.func.isRequired,
  /* Function to handle app view modal deny click */
  handleAppViewDenyClick: PropTypes.func.isRequired,
  /* Function to handle app view modal approve click */
  handleAppViewApproveClick: PropTypes.func.isRequired,
  /* Function to handle unreviewed apps load button click */
  handleUnreviewedAppsButtonClick: PropTypes.func.isRequired,
  /* Function to handle approved apps load button click */
  handleApprovedAppsButtonClick: PropTypes.func.isRequired,
  /* Function to handle denied apps load button click */
  handleDeniedAppsButtonClick: PropTypes.func.isRequired,
  /* Whether the app status update was successful */
  isAppStatusUpdateSuccessful: PropTypes.bool.isRequired,
  /* Whether the app status update failed */
  isAppStatusUpdateFailed: PropTypes.bool.isRequired,
  /* Error information for failed app status update */
  /* eslint-disable-next-line react/forbid-prop-types */
  appUpdateStatusError: PropTypes.object,
  /* Whether deleteing app was successful */
  isAppDeleteSuccessful: PropTypes.bool.isRequired,
  /* Whether deleteing app failed */
  isAppDeleteFailed: PropTypes.bool.isRequired,
  /* App delete error */
  /* eslint-disable-next-line react/forbid-prop-types */
  appDeleteError: PropTypes.object,
  /* Function to handle delete button click */
  handleAppDeleteButtonClick: PropTypes.func.isRequired,
  /* Whether image information is loading */
  isImagesLoading: PropTypes.bool.isRequired,
  /* Image load failure information */
  /* eslint-disable-next-line react/forbid-prop-types */
  imageLoadingError: PropTypes.object,
  /* imageInformation */
  imageInformation: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* Function to handle load all images button click */
  handleLoadAllImagesClick: PropTypes.func.isRequired,
  /* Function to handle load featured images click */
  handleLoadFeaturedImagesClick: PropTypes.func.isRequired,
  /* Function to handle view gallery image click */
  handleViewImageClick: PropTypes.func.isRequired,
  /* Whether gallery view modal is open */
  isImageViewModalOpen: PropTypes.bool.isRequired,
  /* Image info to show in modal */
  /* eslint-disable-next-line react/forbid-prop-types */
  selectedImageInfoToView: PropTypes.object.isRequired,
  /* Function to handle closing image modal */
  handleViewImageGoBackClick: PropTypes.func.isRequired,
  /* Function to handle view image modal delete button */
  handleViewImageDeleteButtonClick: PropTypes.func.isRequired,
  /* Whether image deletion was successful */
  isImageDeleteSuccessful: PropTypes.bool.isRequired,
  /* Whether image toggle feature update was successful */
  isImageToggleUpdateSuccessful: PropTypes.bool.isRequired,
  /* Whether upload modal is open */
  isUploadModalOpen: PropTypes.bool.isRequired,
  /* Function to open upload modal */
  handleUploadNewButtonClick: PropTypes.func.isRequired,
  /* Function to close upload modal */
  handleUploadModalGoBackClick: PropTypes.func.isRequired,
  /* Functio to handle toggle featured button click */
  handleViewImageToggleFeaturedButtonClick: PropTypes.func.isRequired,
};

const defaultProps = {
  selectedJSON: '',
  jsonEditError: {},
  appsLoadError: null,
  appUpdateStatusError: null,
  appDeleteError: null,
  imageLoadingError: null,
};

// edit json
// approve images
const AdminView = (props) => {
  const {
    selectedJSON,
    tentativeSelectedJSON,
    handleEditJSONButton,
    handleJSONEditorChange,
    getJSONEditorRef,
    isJSONLoading,
    handleSaveButtonClick,
    handleYesSaveButtonClick,
    handleNoSaveButtonClick,
    handleGoBackSaveButtonClick,
    isDiscardChangesModalOpen,
    isSaveLoading,
    isSaveFailed,
    jsonEditError,
    isSaveSuccessful,
    handleAppsLoadClick,
    isAppsLoading,
    appData,
    handleAppViewClick,
    isViewModalOpen,
    selectedAppToView,
    handleAppViewGoBackClick,
    handleAppViewDenyClick,
    handleAppViewApproveClick,
    handleUnreviewedAppsButtonClick,
    handleApprovedAppsButtonClick,
    handleDeniedAppsButtonClick,
    appsLoadError,
    isAppStatusUpdateSuccessful,
    isAppStatusUpdateFailed,
    appUpdateStatusError,
    handleAppDeleteButtonClick,
    isAppDeleteSuccessful,
    isAppDeleteFailed,
    appDeleteError,
    isImagesLoading,
    imageLoadingError,
    imageInformation,
    handleLoadAllImagesClick,
    handleLoadFeaturedImagesClick,
    handleViewImageClick,
    isImageViewModalOpen,
    selectedImageInfoToView,
    handleViewImageGoBackClick,
    handleViewImageDeleteButtonClick,
    handleViewImageToggleFeaturedButtonClick,
    isImageDeleteSuccessful,
    isImageToggleUpdateSuccessful,
    isUploadModalOpen,
    handleUploadNewButtonClick,
    handleUploadModalGoBackClick,
  } = props;

  const buildJSONEditor = () => (
    <>
      <>
        <Modal
          visible={isDiscardChangesModalOpen}
          title="Discard Changes?"
          onCancel={handleGoBackSaveButtonClick}
          footer={[
            <Button key="go-back" onClick={handleGoBackSaveButtonClick}>Go Back</Button>,
            <Button key="no" onClick={handleNoSaveButtonClick}>No</Button>,
            <Button key="yes" onClick={handleYesSaveButtonClick} type="primary">Yes</Button>,
          ]}
        >
          You have unsaved changes. Would you like to save those changes before continuing?
        </Modal>
        <Button
          className="admin-page-json-edit-select-button"
          type={selectedJSON === 'rules' ? 'primary' : ''}
          onClick={() => { handleEditJSONButton('rules'); }}
          loading={isJSONLoading && tentativeSelectedJSON === 'rules'}
          disabled={isSaveLoading}
        >
          Rules
        </Button>
        <Button
          className="admin-page-json-edit-select-button"
          type={selectedJSON === 'serverInformation' ? 'primary' : ''}
          onClick={() => { handleEditJSONButton('serverInformation'); }}
          loading={isJSONLoading && tentativeSelectedJSON === 'serverInformation'}
          disabled={isSaveLoading}
        >
          Server Information
        </Button>
        <Button
          className="admin-page-json-edit-select-button"
          type={selectedJSON === 'aboutUsInformation' ? 'primary' : ''}
          onClick={() => { handleEditJSONButton('aboutUsInformation'); }}
          loading={isJSONLoading && tentativeSelectedJSON === 'aboutUsInformation'}
          disabled={isSaveLoading}
        >
          About us Mods
        </Button>
        <Button
          className="admin-page-json-edit-select-button"
          type={selectedJSON === 'veteransInformation' ? 'primary' : ''}
          onClick={() => { handleEditJSONButton('veteransInformation'); }}
          loading={isJSONLoading && tentativeSelectedJSON === 'veteransInformation'}
          disabled={isSaveLoading}
        >
          Veterans
        </Button>
        <Button
          className="admin-page-save-button"
          type="primary"
          onClick={handleSaveButtonClick}
          loading={isSaveLoading}
        >
          Save
        </Button>
        {isSaveSuccessful
            && <Alert className="admin-page-alert" message="Save successful" type="success" showIcon closable />}
        {isSaveFailed
          && <Alert className="admin-page-alert" message={jsonEditError.message} type="error" showIcon closable /> }
      </>
      <JsonEditor value={{}} onChange={handleJSONEditorChange} ref={getJSONEditorRef} />
    </>
  );

  const buildAppModalContent = () => (
    <div className="admin-page-app-view-modal">
      <Space direction="vertical">
        <Typography.Text strong underline>
          In-Game-Name:
        </Typography.Text>
        <Typography.Text>
          {selectedAppToView.inGameName}
        </Typography.Text>
        <Typography.Text strong underline>
          Discord Username:
        </Typography.Text>
        <Typography.Text>
          {selectedAppToView.discordUsername}
        </Typography.Text>
        <Typography.Text strong underline>
          Age:
        </Typography.Text>
        <Typography.Text>
          {selectedAppToView.age}
        </Typography.Text>
        <Typography.Text strong underline>
          Location:
        </Typography.Text>
        <Typography.Text>
          {selectedAppToView.location}
        </Typography.Text>
        <Typography.Text strong underline>
          Why would you like to join?:
        </Typography.Text>
        <Typography.Text>
          {selectedAppToView.joinReason}
        </Typography.Text>
        <Typography.Text strong underline>
          Preferred Play Style:
        </Typography.Text>
        <Typography.Text>
          {selectedAppToView.playStyle}
        </Typography.Text>
        <Typography.Text strong underline>
          What do you do in your free time?:
        </Typography.Text>
        <Typography.Text>
          {selectedAppToView.freeTime}
        </Typography.Text>
        <Typography.Text strong underline>
          How did you hear about us?:
        </Typography.Text>
        <Typography.Text>
          {selectedAppToView.source.option}
        </Typography.Text>
        <Typography.Text>
          {selectedAppToView.source.text}
        </Typography.Text>
      </Space>
    </div>
  );

  const buildAppsList = () => (
    <>
      {!!Object.keys(selectedAppToView).length
          && (
          <Modal
            visible={isViewModalOpen}
            title={
              `Application: ${selectedAppToView.inGameName} - 
              ${selectedAppToView.discordUsername} - 
              ${selectedAppToView.age}yo - 
              ${selectedAppToView.status.toUpperCase()}`
            }
            onCancel={handleAppViewGoBackClick}
            footer={[
              <Button key="go-back" onClick={handleAppViewGoBackClick}>Go Back</Button>,
              <Button
                key="delete"
                onClick={() => { handleAppDeleteButtonClick(selectedAppToView.appID); }}
              >
                Delete
              </Button>,
              <Button key="Deny" onClick={() => { handleAppViewDenyClick(selectedAppToView.appID); }}>Deny</Button>,
              <Button
                key="Approve"
                onClick={() => { handleAppViewApproveClick(selectedAppToView.appID); }}
                type="primary"
              >
                Approve
              </Button>,
            ]}
          >
            {!!Object.keys(selectedAppToView).length && buildAppModalContent()}
          </Modal>
          )}
      <Typography.Title className="admin-page-applications-title">
        Applications
      </Typography.Title>
      {isAppStatusUpdateSuccessful
        && (
        <Alert
          className="admin-page-alert"
          message="App status update successful"
          type="success"
          showIcon
          closable
        />
        )}
      {isAppStatusUpdateFailed
        && (
        <Alert
          className="admin-page-alert"
          message={appUpdateStatusError.message}
          type="error"
          showIcon
          closable
        />
        )}
      {appsLoadError
        && <Alert className="admin-page-alert" message={appsLoadError.message} type="error" showIcon closable />}
      {isAppDeleteSuccessful
        && <Alert className="admin-page-alert" message="App deleted succesfully" type="success" showIcon closable />}
      {(appDeleteError || isAppDeleteFailed)
        && <Alert className="admin-page-alert" message={appDeleteError.message} type="error" showIcon closable />}
      <Button
        className="admin-page-app-type-select-button"
        onClick={handleUnreviewedAppsButtonClick}
        loading={isAppsLoading}
      >
        Unreviewed
      </Button>
      <Button
        className="admin-page-app-type-select-button"
        onClick={handleApprovedAppsButtonClick}
        loading={isAppsLoading}
      >
        Approved
      </Button>
      <Button
        className="admin-page-app-type-select-button"
        onClick={handleDeniedAppsButtonClick}
        loading={isAppsLoading}
      >
        Denied
      </Button>
      <Button
        className="admin-page-load-apps-button"
        onClick={handleAppsLoadClick}
        type="primary"
        loading={isAppsLoading}
      >
        Load Applications
      </Button>
      <List
        className="admin-page-applications-list"
        loading={isAppsLoading}
        itemLayout="horizontal"
        dataSource={appData}
        renderItem={(app) => (
          <List.Item>
            <Typography.Text>
              {`${app.appID}: ${app.inGameName} - ${app.discordUsername} - ${app.age}yo - ${app.status.toUpperCase()}`}
            </Typography.Text>
            <Button
              disabled={isAppsLoading}
              onClick={() => { handleAppViewClick(app.appID); }}
            >
              View
            </Button>
          </List.Item>
        )}
      />
    </>
  );

  const buildGalleryModalContent = () => (
    <img
      className="admin-page-gallery-modal-image"
      src={selectedImageInfoToView.address}
      alt="oops"
    />
  );

  const buildUploadModalContent = () => {
    const beforeUpload = (file) => {
      const acceptedTypes = ['png', 'jpg', 'jpeg'];
      const splitFileName = file.name.split('.');
      return acceptedTypes.includes(splitFileName[splitFileName.length - 1].toLowerCase());
    };

    return (
      <Upload action="/imageUpload" accept=".png,.jpg,.jpeg" beforeUpload={beforeUpload}>
        <Button>
          <UploadOutlined />
          {' '}
          Click to Upload
        </Button>
      </Upload>
    );
  };

  const buildGalleryEditor = () => (
    <>
      <Modal
        visible={isImageViewModalOpen}
        // eslint-disable-next-line max-len
        title={`Image: ${selectedImageInfoToView.title} - ${selectedImageInfoToView.isFeatured ? 'Featured' : 'Not Featured'}`}
        onCancel={handleViewImageGoBackClick}
        footer={[
          <Button key="go-back" onClick={handleViewImageGoBackClick}>Go Back</Button>,
          <Button
            key="delete"
            onClick={() => { handleViewImageDeleteButtonClick(selectedImageInfoToView.id); }}
          >
            Delete
          </Button>,
          <Button
            key="Toggle Featured"
            onClick={() => { handleViewImageToggleFeaturedButtonClick(selectedImageInfoToView.id); }}
          >
            Toggle Featured
          </Button>,
        ]}
      >
        {!!Object.keys(selectedImageInfoToView).length && buildGalleryModalContent()}
      </Modal>
      <Modal
        visible={isUploadModalOpen}
        title="Upload new image"
        onCancel={handleUploadModalGoBackClick}
        footer={[
          <Button key="go-back" onClick={handleUploadModalGoBackClick}>Go Back</Button>,
        ]}
      >
        {buildUploadModalContent()}
      </Modal>
      <Typography.Title className="admin-page-applications-title">
        Gallery
      </Typography.Title>
      {imageLoadingError
        && <Alert className="admin-page-alert" message={imageLoadingError.message} type="error" showIcon closable />}
      {isImageDeleteSuccessful
        && (
        <Alert
          className="admin-page-alert"
          message="Image deleted successfully"
          type="success"
          showIcon
          closable
        />
        )}
      {isImageToggleUpdateSuccessful
        && (
        <Alert
          className="admin-page-alert"
          message="Image featured update successful"
          type="success"
          showIcon
          closable
        />
        )}
      <Button
        className="admin-page-app-type-select-button"
        onClick={handleLoadFeaturedImagesClick}
        loading={isImagesLoading}
      >
        Featured
      </Button>
      <Button
        className="admin-page-app-type-select-button"
        onClick={handleLoadAllImagesClick}
        loading={isImagesLoading}
      >
        All
      </Button>
      <Button
        className="admin-page-app-type-select-button"
        loading={isImagesLoading}
        onClick={handleUploadNewButtonClick}
      >
        Upload New
      </Button>
      <Button
        className="admin-page-load-apps-button"
        onClick={handleLoadAllImagesClick}
        type="primary"
        loading={isImagesLoading}
      >
        Load Image Info
      </Button>
      <List
        className="admin-page-applications-list"
        loading={isImagesLoading}
        itemLayout="horizontal"
        dataSource={imageInformation}
        renderItem={(image) => (
          <List.Item>
            <Typography.Text>
              {`${image.id}: ${image.title} - ${image.isFeatured ? 'Featured' : 'Not Featured'}`}
            </Typography.Text>
            <Button
              disabled={isImagesLoading}
              onClick={() => { handleViewImageClick(image.id); }}
            >
              View
            </Button>
          </List.Item>
        )}
      />
    </>
  );

  return (
    <>
      {buildJSONEditor()}
      {buildAppsList()}
      {buildGalleryEditor()}
    </>
  );
};

AdminView.propTypes = propTypes;
AdminView.defaultProps = defaultProps;

export default AdminView;
