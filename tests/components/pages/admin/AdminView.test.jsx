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
        isFailed={false}
        error={{}}
        isSaveSuccessful={false}
        tentativeSelectedJSON=""
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
        isJSONLoading={true}
        handleSaveButtonClick={() => {}}
        isDiscardChangesModalOpen={false}
        handleYesSaveButtonClick={() => {}}
        handleNoSaveButtonClick={() => {}}
        handleGoBackSaveButtonClick={() => {}}
        isSaveLoading={false}
        isFailed={false}
        error={{}}
        isSaveSuccessful={false}
        tentativeSelectedJSON=""
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
        isSaveLoading={true}
        isFailed={false}
        error={{}}
        isSaveSuccessful={false}
        tentativeSelectedJSON=""
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
        isFailed={true}
        error={{}}
        isSaveSuccessful={false}
        tentativeSelectedJSON=""
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
        isFailed={false}
        error={{}}
        isSaveSuccessful={true}
        tentativeSelectedJSON=""
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
          isFailed={false}
          error={{}}
          isSaveSuccessful={false}
          tentativeSelectedJSON=""
        />,
      )

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