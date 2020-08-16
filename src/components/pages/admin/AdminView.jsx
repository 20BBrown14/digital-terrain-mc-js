import React from 'react';
import PropTypes from 'prop-types';
import { Button, Alert, Modal } from 'antd';
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
  isFailed: PropTypes.bool.isRequired,
  /* Error information */
  /* eslint-disable-next-line react/forbid-prop-types */
  error: PropTypes.object,
  /* Whether the save was successful */
  isSaveSuccessful: PropTypes.bool.isRequired,
  /* The tentatively selected button */
  tentativeSelectedJSON: PropTypes.string.isRequired,
};

const defaultProps = {
  selectedJSON: '',
  error: {},
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
    isFailed,
    error,
    isSaveSuccessful,
  } = props;
  return (
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
        {isFailed && <Alert className="admin-page-alert" message={error.message} type="error" showIcon closable /> }
      </>
      <JsonEditor value={{}} onChange={handleJSONEditorChange} ref={getJSONEditorRef} />
    </>
  );
};

AdminView.propTypes = propTypes;
AdminView.defaultProps = defaultProps;

export default AdminView;
