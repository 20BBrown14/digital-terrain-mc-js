import React from 'react';
import AdminView from '../../../../src/components/pages/admin/AdminView';

describe('AdminView', () => {
  it('renders a default view', () => {
    const view = shallow(
      <AdminView
        selectedJSON=""
        handleEditJSONButton={() => {}}
        handleJSONEditorChange={() => {}}
        getJSONEditorRef={() => {}}
        isJSONLoading={false}
        handleSaveButtonClick={() => {}}
        isDiscardChangesModalOpen={false}
        handleYesSaveButtonClick={() => {}}
        handleNoSaveButtonClick={() => {}}
        handleGoBackSaveButtonClick={() => {}}
        isSaveLoading={false}
        isSaveFailed={false}
        error={{}}
        isSaveSuccessful={false}
        tentativeSelectedJSON=""
        handleAppsLoadClick={() => {}}
        isAppsLoading={false}
        appData={[{}]}
        handleAppViewClick={() => {}}
        isViewModalOpen={false}
        selectedAppToView={{}}
        handleAppViewGoBackClick={() => {}}
        handleAppViewDenyClick={() => {}}
        handleAppViewApproveClick={() => {}}
        handleUnreviewedAppsButtonClick={() => {}}
        handleApprovedAppsButtonClick={() => {}}
        handleDeniedAppsButtonClick={() => {}}
        isAppStatusUpdateSuccessful={false}
        isAppStatusUpdateFailed={false}
        isAppDeleteSuccessful={false}
        isAppDeleteFailed={false}
        handleAppDeleteButtonClick={() => {}}
        isImagesLoading={false}
        isImagesLoadingFailed={false}
        imageInformation={[]}
        handleLoadAllImagesClick={() => {}}
        handleLoadFeaturedImagesClick={() => {}}
        handleViewImageClick={() => {}}
        isImageViewModalOpen={false}
        selectedImageInfoToView={{}}
        handleViewImageGoBackClick={() => {}}
        handleViewImageDeleteButtonClick={() => {}}
        handleViewImageMakeFeaturedButtonClick={() => {}}
        isImageDeleteSuccessful={false}
        isImageToggleUpdateSuccessful={false}
        isUploadModalOpen={false}
        handleUploadNewButtonClick={() => {}}
        handleUploadModalGoBackClick={() => {}}
        handleUploadModalUploadClick={() => {}}
        handleViewImageToggleFeaturedButtonClick={() => {}}
      />,
    );

    expect(view).toMatchSnapshot();
  });

  it('renders a json loading view', () => {
    const view = shallow(
      <AdminView
        selectedJSON=""
        handleEditJSONButton={() => {}}
        handleJSONEditorChange={() => {}}
        getJSONEditorRef={() => {}}
        isJSONLoading
        handleSaveButtonClick={() => {}}
        isDiscardChangesModalOpen={false}
        handleYesSaveButtonClick={() => {}}
        handleNoSaveButtonClick={() => {}}
        handleGoBackSaveButtonClick={() => {}}
        isSaveLoading={false}
        isSaveFailed={false}
        error={{}}
        isSaveSuccessful={false}
        tentativeSelectedJSON=""
        handleAppsLoadClick={() => {}}
        isAppsLoading={false}
        appData={[{}]}
        handleAppViewClick={() => {}}
        isViewModalOpen={false}
        selectedAppToView={{}}
        handleAppViewGoBackClick={() => {}}
        handleAppViewDenyClick={() => {}}
        handleAppViewApproveClick={() => {}}
        handleUnreviewedAppsButtonClick={() => {}}
        handleApprovedAppsButtonClick={() => {}}
        handleDeniedAppsButtonClick={() => {}}
        isAppStatusUpdateSuccessful={false}
        isAppStatusUpdateFailed={false}
        isAppDeleteSuccessful={false}
        isAppDeleteFailed={false}
        handleAppDeleteButtonClick={() => {}}
        isImagesLoading={false}
        isImagesLoadingFailed={false}
        imageInformation={[]}
        handleLoadAllImagesClick={() => {}}
        handleLoadFeaturedImagesClick={() => {}}
        handleViewImageClick={() => {}}
        isImageViewModalOpen={false}
        selectedImageInfoToView={{}}
        handleViewImageGoBackClick={() => {}}
        handleViewImageDeleteButtonClick={() => {}}
        handleViewImageMakeFeaturedButtonClick={() => {}}
        isImageDeleteSuccessful={false}
        isImageToggleUpdateSuccessful={false}
        isUploadModalOpen={false}
        handleUploadNewButtonClick={() => {}}
        handleUploadModalGoBackClick={() => {}}
        handleUploadModalUploadClick={() => {}}
        handleViewImageToggleFeaturedButtonClick={() => {}}
      />,
    );

    expect(view).toMatchSnapshot();
  });

  it('renders a save loading view', () => {
    const view = shallow(
      <AdminView
        selectedJSON=""
        handleEditJSONButton={() => {}}
        handleJSONEditorChange={() => {}}
        getJSONEditorRef={() => {}}
        isJSONLoading={false}
        handleSaveButtonClick={() => {}}
        isDiscardChangesModalOpen={false}
        handleYesSaveButtonClick={() => {}}
        handleNoSaveButtonClick={() => {}}
        handleGoBackSaveButtonClick={() => {}}
        isSaveLoading
        isSaveFailed={false}
        error={{}}
        isSaveSuccessful={false}
        tentativeSelectedJSON=""
        handleAppsLoadClick={() => {}}
        isAppsLoading={false}
        appData={[{}]}
        handleAppViewClick={() => {}}
        isViewModalOpen={false}
        selectedAppToView={{}}
        handleAppViewGoBackClick={() => {}}
        handleAppViewDenyClick={() => {}}
        handleAppViewApproveClick={() => {}}
        handleUnreviewedAppsButtonClick={() => {}}
        handleApprovedAppsButtonClick={() => {}}
        handleDeniedAppsButtonClick={() => {}}
        isAppStatusUpdateSuccessful={false}
        isAppStatusUpdateFailed={false}
        isAppDeleteSuccessful={false}
        isAppDeleteFailed={false}
        handleAppDeleteButtonClick={() => {}}
        isImagesLoading={false}
        isImagesLoadingFailed={false}
        imageInformation={[]}
        handleLoadAllImagesClick={() => {}}
        handleLoadFeaturedImagesClick={() => {}}
        handleViewImageClick={() => {}}
        isImageViewModalOpen={false}
        selectedImageInfoToView={{}}
        handleViewImageGoBackClick={() => {}}
        handleViewImageDeleteButtonClick={() => {}}
        handleViewImageMakeFeaturedButtonClick={() => {}}
        isImageDeleteSuccessful={false}
        isImageToggleUpdateSuccessful={false}
        isUploadModalOpen={false}
        handleUploadNewButtonClick={() => {}}
        handleUploadModalGoBackClick={() => {}}
        handleUploadModalUploadClick={() => {}}
        handleViewImageToggleFeaturedButtonClick={() => {}}
      />,
    );

    expect(view).toMatchSnapshot();
  });

  it('renders a failed view', () => {
    const view = shallow(
      <AdminView
        selectedJSON=""
        handleEditJSONButton={() => {}}
        handleJSONEditorChange={() => {}}
        getJSONEditorRef={() => {}}
        isJSONLoading={false}
        handleSaveButtonClick={() => {}}
        isDiscardChangesModalOpen={false}
        handleYesSaveButtonClick={() => {}}
        handleNoSaveButtonClick={() => {}}
        handleGoBackSaveButtonClick={() => {}}
        isSaveLoading={false}
        isSaveFailed
        error={{}}
        isSaveSuccessful={false}
        tentativeSelectedJSON=""
        handleAppsLoadClick={() => {}}
        isAppsLoading={false}
        appData={[{}]}
        handleAppViewClick={() => {}}
        isViewModalOpen={false}
        selectedAppToView={{}}
        handleAppViewGoBackClick={() => {}}
        handleAppViewDenyClick={() => {}}
        handleAppViewApproveClick={() => {}}
        handleUnreviewedAppsButtonClick={() => {}}
        handleApprovedAppsButtonClick={() => {}}
        handleDeniedAppsButtonClick={() => {}}
        isAppStatusUpdateSuccessful={false}
        isAppStatusUpdateFailed={false}
        isAppDeleteSuccessful={false}
        isAppDeleteFailed={false}
        handleAppDeleteButtonClick={() => {}}
        isImagesLoading={false}
        isImagesLoadingFailed={false}
        imageInformation={[]}
        handleLoadAllImagesClick={() => {}}
        handleLoadFeaturedImagesClick={() => {}}
        handleViewImageClick={() => {}}
        isImageViewModalOpen={false}
        selectedImageInfoToView={{}}
        handleViewImageGoBackClick={() => {}}
        handleViewImageDeleteButtonClick={() => {}}
        handleViewImageMakeFeaturedButtonClick={() => {}}
        isImageDeleteSuccessful={false}
        isImageToggleUpdateSuccessful={false}
        isUploadModalOpen={false}
        handleUploadNewButtonClick={() => {}}
        handleUploadModalGoBackClick={() => {}}
        handleUploadModalUploadClick={() => {}}
        handleViewImageToggleFeaturedButtonClick={() => {}}
      />,
    );

    expect(view).toMatchSnapshot();
    expect(view.find('Alert')).toHaveLength(1);
  });

  it('renders a save successful view', () => {
    const view = shallow(
      <AdminView
        selectedJSON=""
        handleEditJSONButton={() => {}}
        handleJSONEditorChange={() => {}}
        getJSONEditorRef={() => {}}
        isJSONLoading={false}
        handleSaveButtonClick={() => {}}
        isDiscardChangesModalOpen={false}
        handleYesSaveButtonClick={() => {}}
        handleNoSaveButtonClick={() => {}}
        handleGoBackSaveButtonClick={() => {}}
        isSaveLoading={false}
        isSaveFailed={false}
        error={{}}
        isSaveSuccessful
        tentativeSelectedJSON=""
        handleAppsLoadClick={() => {}}
        isAppsLoading={false}
        appData={[{}]}
        handleAppViewClick={() => {}}
        isViewModalOpen={false}
        selectedAppToView={{}}
        handleAppViewGoBackClick={() => {}}
        handleAppViewDenyClick={() => {}}
        handleAppViewApproveClick={() => {}}
        handleUnreviewedAppsButtonClick={() => {}}
        handleApprovedAppsButtonClick={() => {}}
        handleDeniedAppsButtonClick={() => {}}
        isAppStatusUpdateSuccessful={false}
        isAppStatusUpdateFailed={false}
        isAppDeleteSuccessful={false}
        isAppDeleteFailed={false}
        handleAppDeleteButtonClick={() => {}}
        isImagesLoading={false}
        isImagesLoadingFailed={false}
        imageInformation={[]}
        handleLoadAllImagesClick={() => {}}
        handleLoadFeaturedImagesClick={() => {}}
        handleViewImageClick={() => {}}
        isImageViewModalOpen={false}
        selectedImageInfoToView={{}}
        handleViewImageGoBackClick={() => {}}
        handleViewImageDeleteButtonClick={() => {}}
        handleViewImageMakeFeaturedButtonClick={() => {}}
        isImageDeleteSuccessful={false}
        isImageToggleUpdateSuccessful={false}
        isUploadModalOpen={false}
        handleUploadNewButtonClick={() => {}}
        handleUploadModalGoBackClick={() => {}}
        handleUploadModalUploadClick={() => {}}
        handleViewImageToggleFeaturedButtonClick={() => {}}
      />,
    );

    expect(view).toMatchSnapshot();
    expect(view.find('Alert')).toHaveLength(1);
  });

  describe('button click handlers', () => {
    let view;
    let mockHandleEditJSONButton;
    let buttons;
    beforeEach(() => {
      mockHandleEditJSONButton = jest.fn();

      view = shallow(
        <AdminView
          selectedJSON=""
          handleEditJSONButton={mockHandleEditJSONButton}
          handleJSONEditorChange={() => {}}
          getJSONEditorRef={() => {}}
          isJSONLoading={false}
          handleSaveButtonClick={() => {}}
          isDiscardChangesModalOpen={false}
          handleYesSaveButtonClick={() => {}}
          handleNoSaveButtonClick={() => {}}
          handleGoBackSaveButtonClick={() => {}}
          isSaveLoading={false}
          isSaveFailed={false}
          error={{}}
          isSaveSuccessful={false}
          tentativeSelectedJSON=""
          handleAppsLoadClick={() => {}}
          isAppsLoading={false}
          appData={[{}]}
          handleAppViewClick={() => {}}
          isViewModalOpen={false}
          selectedAppToView={{}}
          handleAppViewGoBackClick={() => {}}
          handleAppViewDenyClick={() => {}}
          handleAppViewApproveClick={() => {}}
          handleUnreviewedAppsButtonClick={() => {}}
          handleApprovedAppsButtonClick={() => {}}
          handleDeniedAppsButtonClick={() => {}}
          isAppStatusUpdateSuccessful={false}
          isAppStatusUpdateFailed={false}
          isAppDeleteSuccessful={false}
          isAppDeleteFailed={false}
          handleAppDeleteButtonClick={() => {}}
          isImagesLoading={false}
          isImagesLoadingFailed={false}
          imageInformation={[]}
          handleLoadAllImagesClick={() => {}}
          handleLoadFeaturedImagesClick={() => {}}
          handleViewImageClick={() => {}}
          isImageViewModalOpen={false}
          selectedImageInfoToView={{}}
          handleViewImageGoBackClick={() => {}}
          handleViewImageDeleteButtonClick={() => {}}
          handleViewImageMakeFeaturedButtonClick={() => {}}
          isImageDeleteSuccessful={false}
          isImageToggleUpdateSuccessful={false}
          isUploadModalOpen={false}
          handleUploadNewButtonClick={() => {}}
          handleUploadModalGoBackClick={() => {}}
          handleUploadModalUploadClick={() => {}}
          handleViewImageToggleFeaturedButtonClick={() => {}}
        />,
      );

      buttons = view.find('.admin-page-json-edit-select-button');
    });

    describe('rules button', () => {
      it('calls handlers when clicked', () => {
        buttons.at(0).simulate('click');
        expect(mockHandleEditJSONButton).toHaveBeenCalledTimes(1);
        expect(mockHandleEditJSONButton).toHaveBeenCalledWith('rules');
      });
    });

    describe('server information button', () => {
      it('calls handlers when clicked', () => {
        buttons.at(1).simulate('click');
        expect(mockHandleEditJSONButton).toHaveBeenCalledTimes(1);
        expect(mockHandleEditJSONButton).toHaveBeenCalledWith('serverInformation');
      });
    });

    describe('about us button', () => {
      it('calls handlers when clicked', () => {
        buttons.at(2).simulate('click');
        expect(mockHandleEditJSONButton).toHaveBeenCalledTimes(1);
        expect(mockHandleEditJSONButton).toHaveBeenCalledWith('aboutUsInformation');
      });
    });

    describe('veterans button', () => {
      it('calls handlers when clicked', () => {
        buttons.at(3).simulate('click');
        expect(mockHandleEditJSONButton).toHaveBeenCalledTimes(1);
        expect(mockHandleEditJSONButton).toHaveBeenCalledWith('veteransInformation');
      });
    });
  });
});
