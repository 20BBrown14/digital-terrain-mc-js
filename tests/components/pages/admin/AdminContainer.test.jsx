import React from 'react';
import AdminContainer from '../../../../src/components/pages/admin/AdminContainer';
import {
  saveJSONInformationService,
  loadAppsService,
  updateAppStatusService,
  deleteAppService,
  deleteImageService,
  toggleFeaturedImageService,
} from '../../../../src/components/pages/admin/service';
import rulesService from '../../../../src/components/pages/rules/service';
import serverInformationService from '../../../../src/components/pages/server_information/service';
import aboutUsInformationService from '../../../../src/components/pages/about_us/service';
import retrieveGalleryImagesService from '../../../../src/components/pages/gallery/service';

jest.mock('../../../../src/components/pages/admin/service');
jest.mock('../../../../src/components/pages/rules/service');
jest.mock('../../../../src/components/pages/server_information/service');
jest.mock('../../../../src/components/pages/about_us/service');
jest.mock('../../../../src/components/pages/gallery/service');

describe('AdminContainer', () => {
  beforeEach(() => {
    aboutUsInformationService.retrieveAboutUsInformation = jest.fn();
    aboutUsInformationService.retrieveVeteransInformation = jest.fn();
  });

  afterEach(() => {
    saveJSONInformationService.mockClear();
    loadAppsService.mockClear();
    updateAppStatusService.mockClear();
    deleteAppService.mockClear();
    deleteImageService.mockClear();
    toggleFeaturedImageService.mockClear();
    rulesService.mockClear();
    serverInformationService.mockClear();
    retrieveGalleryImagesService.mockClear();
    aboutUsInformationService.retrieveAboutUsInformation.mockClear();
    aboutUsInformationService.retrieveVeteransInformation.mockClear();
  });

  it('renders a default view', () => {
    const container = render(<AdminContainer jwtToken="" />);
    expect(container).toMatchSnapshot();
  });

  it('has a default state', () => {
    const expectedState = {
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
      isImagesLoading: false,
      imageLoadingError: undefined,
      imageInformation: [],
      isImageViewModalOpen: false,
      selectedImageInfoToView: {},
      isImageDeleteSuccessful: false,
      isImageToggleUpdateSuccessful: false,
      isUploadModalOpen: false,
    };

    const container = shallow(<AdminContainer jwtToken="" />).instance();
    expect(container.state).toEqual(expectedState);
  });

  it('has empty cached json', () => {
    const expectedCachedJSON = {
      rules: '',
      serverInformation: '',
      aboutUsInformation: '',
      veteransInformation: '',
    };

    const container = shallow(<AdminContainer jwtToken="" />).instance();
    expect(container.cachedJSON).toEqual(expectedCachedJSON);
  });

  describe('getJSONEditorRef', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('sets jsonEditor ref if instance provided', () => {
      container.getJSONEditorRef({ jsonEditor: 'jsonEditor ref' });

      expect(container.jsonEditor).toEqual('jsonEditor ref');
    });

    it('does not set jsoNEditor ref if instance is not provided', () => {
      container.getJSONEditorRef();

      expect(container.jsonEditor).toBeUndefined();
    });
  });

  describe('saveJSON', () => {
    let container;

    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="somejwttoken" />).instance();
      container.jsonEditor = {
        setMode: () => {},
        set: () => {},
      };
    });

    describe('selectedJSON is set', () => {
      beforeEach(() => {
        container.state.selectedJSON = 'rules';
      });

      it('sets jsonEditor mode', () => {
        container.jsonEditor.setMode = jest.fn();

        container.saveJSON();

        expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(1);
        expect(container.jsonEditor.setMode).toHaveBeenCalledWith('view');
      });

      describe('save service call', () => {
        it('calls saveJSONInformationService', () => {
          saveJSONInformationService.mockClear();
          container.saveJSON();

          expect(saveJSONInformationService).toHaveBeenCalledTimes(1);
          expect(saveJSONInformationService).toHaveBeenCalledWith(
            expect.any(Function),
            expect.any(Function),
            'rules',
            {},
            'somejwttoken',
          );
        });

        describe('successful service call', () => {
          beforeEach(() => {
            saveJSONInformationService.mockImplementation((success) => {
              success({ success: 'success' });
            });
          });

          it('sets state as expected', () => {
            const expectedState = {
              isDirty: false,
              selectedJSON: '',
              tentativeSelectedJSON: '',
              EdittedJSON: {},
              isSaveLoading: false,
              isSaveFailed: false,
              isSaveSuccessful: true,
            };

            container.state.isDirty = true;
            container.state.selectedJSON = 'non-empty string';
            container.state.tentativeSelectedJSON = 'non-empty string';
            container.state.edittedJSON = { json: 'json' };
            container.state.isSaveLoading = true;
            container.state.isSaveFailed = true;

            container.saveJSON();

            expect(container.state.isDirty).toEqual(expectedState.isDirty);
            expect(container.state.selectedJSON).toEqual(expectedState.selectedJSON);
            expect(container.state.tentativeSelectedJSON).toEqual(expectedState.tentativeSelectedJSON);
            expect(container.state.EdittedJSON).toEqual(expectedState.EdittedJSON);
            expect(container.state.isSaveLoading).toEqual(expectedState.isSaveLoading);
            expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
            expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
          });

          it('sets cachedJSON as expected', () => {
            container.state.selectedJSON = 'rules';

            container.saveJSON();

            expect(container.cachedJSON.rules).toEqual({ success: 'success' });
          });

          it('calls jsonEditor setters', () => {
            container.jsonEditor.set = jest.fn();
            container.jsonEditor.setMode = jest.fn();

            container.saveJSON();

            expect(container.jsonEditor.set).toHaveBeenCalledTimes(1);
            expect(container.jsonEditor.set).toHaveBeenCalledWith({});
            expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
            expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
          });
        });

        describe('failed service call', () => {
          beforeEach(() => {
            saveJSONInformationService.mockImplementation((success, failure) => {
              failure({ failed: 'failed' });
            });
          });

          it('sets state as expected', () => {
            container.state.isSaveFailed = false;
            container.state.isSaveLoading = true;

            container.saveJSON();

            expect(container.state.isSaveFailed).toEqual(true);
            expect(container.state.isSaveLoading).toEqual(false);
            expect(container.state.jsonEditError).toEqual({ failed: 'failed' });
          });

          it('calls jsonEditor setters', () => {
            container.jsonEditor.setMode = jest.fn();

            container.saveJSON();

            expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
            expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
          });
        });
      });
    });

    describe('selectedJSON is not set', () => {
      it('does nothing', () => {
        container.state.selectedJSON = '';
        const initialState = container.state;
        container.saveJSON();

        expect(container.state).toEqual(initialState);
      });
    });
  });

  describe('handleJSONEditorChange', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('sets state as expected', () => {
      container.handleJSONEditorChange('some json');

      expect(container.state.EdittedJSON).toEqual('some json');
      expect(container.state.isDirty).toEqual(true);
    });
  });

  describe('loadNewJSON', () => {
    let container;

    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
      container.jsonEditor = {
        setMode: () => {},
        set: () => {},
      };
    });

    it('sets jsonEditor mode', () => {
      container.jsonEditor.setMode = jest.fn();
      container.loadNewJSON();
      expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(1);
      expect(container.jsonEditor.setMode).toHaveBeenCalledWith('view');
    });

    describe('rules is to be loaded', () => {
      beforeEach(() => {
        container.state.tentativeSelectedJSON = 'rules';
      });

      it('sets loading state', () => {
        container.loadNewJSON();
        expect(container.state.isJSONLoading).toEqual(true);
      });

      describe('service is called', () => {
        describe('successful rules service', () => {
          beforeEach(() => {
            rulesService.mockImplementation((success) => {
              success({ success: 'success' });
            });
          });

          it('sets state as expected', () => {
            const expectedState = {
              isJSONLoading: false,
              isSaveFailed: false,
              selectedJSON: 'rules',
              tentativeSelectedJSON: '',
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveFailed = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
            expect(container.state.selectedJSON).toEqual(expectedState.selectedJSON);
            expect(container.state.tentativeSelectedJSON).toEqual(expectedState.tentativeSelectedJSON);
            expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
          });

          it('sets cachedJSON', () => {
            container.loadNewJSON();

            expect(container.cachedJSON.rules).toEqual({ success: 'success' });
          });

          it('calls jsonEditor setters', () => {
            container.jsonEditor.set = jest.fn();
            container.jsonEditor.setMode = jest.fn();

            container.loadNewJSON();

            expect(container.jsonEditor.set).toHaveBeenCalledTimes(1);
            expect(container.jsonEditor.set).toHaveBeenCalledWith({ success: 'success' });
            expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
            expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
          });
        });

        describe('failed service call', () => {
          beforeEach(() => {
            rulesService.mockImplementation((success, failure) => {
              failure({ failed: 'failed' });
            });
          });

          it('sets state as expected', () => {
            const expectedState = {
              jsonEditError: { failed: 'failed' },
              isJSONLoading: false,
              isSaveFailed: true,
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.jsonEditError).toEqual(expectedState.jsonEditError);
            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
            expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
          });

          it('calls jsonEditor setters', () => {
            container.jsonEditor.setMode = jest.fn();

            container.loadNewJSON();

            expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
            expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
          });
        });
      });

      describe('loaded from cache', () => {
        beforeEach(() => {
          container.cachedJSON.rules = { rules: 'rules' };
        });

        it('sets state as expected', () => {
          const expectedState = {
            isJSONLoading: false,
            isSaveFailed: false,
            selectedJSON: 'rules',
            tentativeSelectedJSON: '',
            isSaveSuccessful: false,
          };

          container.state.isJSONLoading = true;
          container.state.isSaveFailed = true;
          container.state.isSaveSuccessful = true;

          container.loadNewJSON();

          expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
          expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
          expect(container.state.selectedJSON).toEqual(expectedState.selectedJSON);
          expect(container.state.tentativeSelectedJSON).toEqual(expectedState.tentativeSelectedJSON);
          expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
        });

        it('calls jsonEditor setters', () => {
          container.jsonEditor.set = jest.fn();
          container.jsonEditor.setMode = jest.fn();

          container.loadNewJSON();

          expect(container.jsonEditor.set).toHaveBeenCalledTimes(1);
          expect(container.jsonEditor.set).toHaveBeenCalledWith({ rules: 'rules' });
          expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
          expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
        });
      });
    });

    describe('server information is to be loaded', () => {
      beforeEach(() => {
        container.state.tentativeSelectedJSON = 'serverInformation';
      });

      it('sets loading state', () => {
        container.loadNewJSON();
        expect(container.state.isJSONLoading).toEqual(true);
      });

      describe('service is called', () => {
        describe('successful server information service', () => {
          beforeEach(() => {
            serverInformationService.mockImplementation((success) => {
              success({ success: 'success' });
            });
          });

          it('sets state as expected', () => {
            const expectedState = {
              isJSONLoading: false,
              isSaveFailed: false,
              selectedJSON: 'serverInformation',
              tentativeSelectedJSON: '',
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveFailed = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
            expect(container.state.selectedJSON).toEqual(expectedState.selectedJSON);
            expect(container.state.tentativeSelectedJSON).toEqual(expectedState.tentativeSelectedJSON);
            expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
          });

          it('sets cachedJSON', () => {
            container.loadNewJSON();

            expect(container.cachedJSON.serverInformation).toEqual({ success: 'success' });
          });

          it('calls jsonEditor setters', () => {
            container.jsonEditor.set = jest.fn();
            container.jsonEditor.setMode = jest.fn();

            container.loadNewJSON();

            expect(container.jsonEditor.set).toHaveBeenCalledTimes(1);
            expect(container.jsonEditor.set).toHaveBeenCalledWith({ success: 'success' });
            expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
            expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
          });
        });

        describe('failed service call', () => {
          beforeEach(() => {
            serverInformationService.mockImplementation((success, failure) => {
              failure({ failed: 'failed' });
            });
          });

          it('sets state as expected', () => {
            const expectedState = {
              jsonEditError: { failed: 'failed' },
              isJSONLoading: false,
              isSaveFailed: true,
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.jsonEditError).toEqual(expectedState.jsonEditError);
            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
            expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
          });

          it('calls jsonEditor setters', () => {
            container.jsonEditor.setMode = jest.fn();

            container.loadNewJSON();

            expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
            expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
          });
        });
      });

      describe('loaded from cache', () => {
        beforeEach(() => {
          container.cachedJSON.serverInformation = { serverInformation: 'serverInformation' };
        });

        it('sets state as expected', () => {
          const expectedState = {
            isJSONLoading: false,
            isSaveFailed: false,
            selectedJSON: 'serverInformation',
            tentativeSelectedJSON: '',
            isSaveSuccessful: false,
          };

          container.state.isJSONLoading = true;
          container.state.isSaveFailed = true;
          container.state.isSaveSuccessful = true;

          container.loadNewJSON();

          expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
          expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
          expect(container.state.selectedJSON).toEqual(expectedState.selectedJSON);
          expect(container.state.tentativeSelectedJSON).toEqual(expectedState.tentativeSelectedJSON);
          expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
        });

        it('calls jsonEditor setters', () => {
          container.jsonEditor.set = jest.fn();
          container.jsonEditor.setMode = jest.fn();

          container.loadNewJSON();

          expect(container.jsonEditor.set).toHaveBeenCalledTimes(1);
          expect(container.jsonEditor.set).toHaveBeenCalledWith({ serverInformation: 'serverInformation' });
          expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
          expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
        });
      });
    });

    describe('about us information is to be loaded', () => {
      beforeEach(() => {
        container.state.tentativeSelectedJSON = 'aboutUsInformation';
      });

      it('sets loading state', () => {
        container.loadNewJSON();
        expect(container.state.isJSONLoading).toEqual(true);
      });

      describe('service is called', () => {
        describe('successful about us information service', () => {
          beforeEach(() => {
            aboutUsInformationService.retrieveAboutUsInformation.mockImplementation((success) => {
              success({ success: 'success' });
            });
          });

          it('sets state as expected', () => {
            const expectedState = {
              isJSONLoading: false,
              isSaveFailed: false,
              selectedJSON: 'aboutUsInformation',
              tentativeSelectedJSON: '',
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveFailed = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
            expect(container.state.selectedJSON).toEqual(expectedState.selectedJSON);
            expect(container.state.tentativeSelectedJSON).toEqual(expectedState.tentativeSelectedJSON);
            expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
          });

          it('sets cachedJSON', () => {
            container.loadNewJSON();

            expect(container.cachedJSON.aboutUsInformation).toEqual({ success: 'success' });
          });

          it('calls jsonEditor setters', () => {
            container.jsonEditor.set = jest.fn();
            container.jsonEditor.setMode = jest.fn();

            container.loadNewJSON();

            expect(container.jsonEditor.set).toHaveBeenCalledTimes(1);
            expect(container.jsonEditor.set).toHaveBeenCalledWith({ success: 'success' });
            expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
            expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
          });
        });

        describe('failed service call', () => {
          beforeEach(() => {
            aboutUsInformationService.retrieveAboutUsInformation.mockImplementation((success, failure) => {
              failure({ failed: 'failed' });
            });
          });

          it('sets state as expected', () => {
            const expectedState = {
              jsonEditError: { failed: 'failed' },
              isJSONLoading: false,
              isSaveFailed: true,
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.jsonEditError).toEqual(expectedState.jsonEditError);
            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
            expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
          });

          it('calls jsonEditor setters', () => {
            container.jsonEditor.setMode = jest.fn();

            container.loadNewJSON();

            expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
            expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
          });
        });
      });

      describe('loaded from cache', () => {
        beforeEach(() => {
          container.cachedJSON.aboutUsInformation = { aboutUsInformation: 'aboutUsInformation' };
        });

        it('sets state as expected', () => {
          const expectedState = {
            isJSONLoading: false,
            isSaveFailed: false,
            selectedJSON: 'aboutUsInformation',
            tentativeSelectedJSON: '',
            isSaveSuccessful: false,
          };

          container.state.isJSONLoading = true;
          container.state.isSaveFailed = true;
          container.state.isSaveSuccessful = true;

          container.loadNewJSON();

          expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
          expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
          expect(container.state.selectedJSON).toEqual(expectedState.selectedJSON);
          expect(container.state.tentativeSelectedJSON).toEqual(expectedState.tentativeSelectedJSON);
          expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
        });

        it('calls jsonEditor setters', () => {
          container.jsonEditor.set = jest.fn();
          container.jsonEditor.setMode = jest.fn();

          container.loadNewJSON();

          expect(container.jsonEditor.set).toHaveBeenCalledTimes(1);
          expect(container.jsonEditor.set).toHaveBeenCalledWith({ aboutUsInformation: 'aboutUsInformation' });
          expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
          expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
        });
      });
    });

    describe('veterans information is to be loaded', () => {
      beforeEach(() => {
        container.state.tentativeSelectedJSON = 'veteransInformation';
      });

      it('sets loading state', () => {
        container.loadNewJSON();
        expect(container.state.isJSONLoading).toEqual(true);
      });

      describe('service is called', () => {
        describe('successful veterans information service', () => {
          beforeEach(() => {
            aboutUsInformationService.retrieveVeteransInformation.mockImplementation((success) => {
              success({ success: 'success' });
            });
          });

          it('sets state as expected', () => {
            const expectedState = {
              isJSONLoading: false,
              isSaveFailed: false,
              selectedJSON: 'veteransInformation',
              tentativeSelectedJSON: '',
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveFailed = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
            expect(container.state.selectedJSON).toEqual(expectedState.selectedJSON);
            expect(container.state.tentativeSelectedJSON).toEqual(expectedState.tentativeSelectedJSON);
            expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
          });

          it('sets cachedJSON', () => {
            container.loadNewJSON();

            expect(container.cachedJSON.veteransInformation).toEqual({ success: 'success' });
          });

          it('calls jsonEditor setters', () => {
            container.jsonEditor.set = jest.fn();
            container.jsonEditor.setMode = jest.fn();

            container.loadNewJSON();

            expect(container.jsonEditor.set).toHaveBeenCalledTimes(1);
            expect(container.jsonEditor.set).toHaveBeenCalledWith({ success: 'success' });
            expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
            expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
          });
        });

        describe('failed service call', () => {
          beforeEach(() => {
            aboutUsInformationService.retrieveVeteransInformation.mockImplementation((success, failure) => {
              failure({ failed: 'failed' });
            });
          });

          it('sets state as expected', () => {
            const expectedState = {
              jsonEditError: { failed: 'failed' },
              isJSONLoading: false,
              isSaveFailed: true,
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.jsonEditError).toEqual(expectedState.jsonEditError);
            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
            expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
          });

          it('calls jsonEditor setters', () => {
            container.jsonEditor.setMode = jest.fn();

            container.loadNewJSON();

            expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
            expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
          });
        });
      });

      describe('loaded from cache', () => {
        beforeEach(() => {
          container.cachedJSON.veteransInformation = { veteransInformation: 'veteransInformation' };
        });

        it('sets state as expected', () => {
          const expectedState = {
            isJSONLoading: false,
            isSaveFailed: false,
            selectedJSON: 'veteransInformation',
            tentativeSelectedJSON: '',
            isSaveSuccessful: false,
          };

          container.state.isJSONLoading = true;
          container.state.isSaveFailed = true;
          container.state.isSaveSuccessful = true;

          container.loadNewJSON();

          expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
          expect(container.state.isSaveFailed).toEqual(expectedState.isSaveFailed);
          expect(container.state.selectedJSON).toEqual(expectedState.selectedJSON);
          expect(container.state.tentativeSelectedJSON).toEqual(expectedState.tentativeSelectedJSON);
          expect(container.state.isSaveSuccessful).toEqual(expectedState.isSaveSuccessful);
        });

        it('calls jsonEditor setters', () => {
          container.jsonEditor.set = jest.fn();
          container.jsonEditor.setMode = jest.fn();

          container.loadNewJSON();

          expect(container.jsonEditor.set).toHaveBeenCalledTimes(1);
          expect(container.jsonEditor.set).toHaveBeenCalledWith({ veteransInformation: 'veteransInformation' });
          expect(container.jsonEditor.setMode).toHaveBeenCalledTimes(2);
          expect(container.jsonEditor.setMode.mock.calls[1][0]).toEqual('tree');
        });
      });
    });

    describe('Unexpected information requested for load', () => {
      it('sets state as expected', () => {
        container.state.isJSONLoading = true;
        container.loadNewJSON();

        expect(container.state.isJSONLoading).toEqual(false);
        expect(container.state.isSaveFailed).toEqual(true);
        expect(container.state.jsonEditError).toEqual({ message: 'Unexpected value for json to edit' });
      });
    });
  });

  describe('handleEditJSONButton', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
      container.loadNewJSON = () => {};
    });

    describe('JSON is dirty', () => {
      beforeEach(() => {
        container.state.isDirty = true;
      });

      it('sets state as expected', () => {
        container.handleEditJSONButton('rules');

        expect(container.state.isDiscardChangesModalOpen).toEqual(true);
        expect(container.state.tentativeSelectedJSON).toEqual('rules');
      });
    });

    describe('JSON is not dirty', () => {
      it('sets state as expected', () => {
        container.handleEditJSONButton('rules');

        expect(container.state.tentativeSelectedJSON).toEqual('rules');
      });

      it('calls loadNewJSON', () => {
        container.loadNewJSON = jest.fn();
        container.handleEditJSONButton('rules');
        expect(container.loadNewJSON).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('handleEditJSONButton', () => {
    let container;

    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
      container.saveJSON = () => {};
    });

    describe('JSON is dirty', () => {
      beforeEach(() => {
        container.state.isDirty = true;
      });

      it('sets state as expected', () => {
        container.handleSaveButtonClick();
        expect(container.state.isSaveLoading).toEqual(true);
      });

      it('calls saveJSON', () => {
        container.saveJSON = jest.fn();
        container.handleSaveButtonClick();
        expect(container.saveJSON).toHaveBeenCalledTimes(1);
      });
    });

    describe('JSON is not dirty', () => {
      it('does nothing', () => {
        const initialState = container.state;
        container.handleSaveButtonClick();
        expect(container.state).toEqual(initialState);
      });
    });
  });

  describe('handleYesSaveButtonClick', () => {
    let container;

    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
      container.saveJSON = () => {};
      container.loadNewJSON = () => {};
    });

    it('sets state as expected', () => {
      container.state.isDiscardChangesModalOpen = true;
      container.handleYesSaveButtonClick();

      expect(container.state.isDiscardChangesModalOpen).toEqual(false);
    });

    it('calls saveJSON and loadNewJSON', () => {
      container.saveJSON = jest.fn();
      container.loadNewJSON = jest.fn();
      container.handleYesSaveButtonClick();

      expect(container.saveJSON).toHaveBeenCalledTimes(1);
      expect(container.loadNewJSON).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleNoSaveButtonClick', () => {
    let container;

    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
      container.loadNewJSON = () => {};
    });

    it('sets state as expected', () => {
      container.state.isDirty = true;
      container.state.isDiscardChangesModalOpen = true;
      container.handleNoSaveButtonClick();

      expect(container.state.isDirty).toEqual(false);
      expect(container.state.isDiscardChangesModalOpen).toEqual(false);
    });

    it('calls loadNewJSON', () => {
      container.loadNewJSON = jest.fn();
      container.handleNoSaveButtonClick();

      expect(container.loadNewJSON).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleGoBackSaveButtonClick', () => {
    let container;

    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('sets state as expected', () => {
      container.state.isDiscardChangesModalOpen = true;
      container.handleGoBackSaveButtonClick();

      expect(container.state.isDiscardChangesModalOpen).toEqual(false);
    });
  });

  describe('loadApps', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="sometokenhere" />).instance();
    });

    it('sets state as expected', () => {
      container.loadApps('submitted');

      expect(container.state.isAppsLoading).toEqual(true);
    });

    it('calls loadAppsService', () => {
      container.loadApps('submitted');
      expect(loadAppsService).toHaveBeenCalledTimes(1);
      expect(loadAppsService).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        'submitted',
        'sometokenhere',
      );
    });

    describe('successful call', () => {
      beforeEach(() => {
        loadAppsService.mockImplementation((success) => {
          success([{}, {}, {}]);
        });
      });

      it('sets state as expected', () => {
        container.state.isAppsLoading = true;
        container.state.appsLoadError = {};
        container.loadApps('submitted');
        expect(container.state.isAppsLoading).toEqual(false);
        expect(container.state.appData).toEqual([{}, {}, {}]);
        expect(container.state.appsLoadError).toBeUndefined();
      });
    });

    describe('failed call', () => {
      const error = new Error('error');
      beforeEach(() => {
        loadAppsService.mockImplementation((success, failure) => {
          failure(error);
        });
      });

      it('sets state as expected', () => {
        container.state.isAppsLoading = true;
        container.loadApps('submitted');
        expect(container.state.isAppsLoading).toEqual(false);
        expect(container.state.appsLoadError).toEqual(error);
      });
    });
  });

  describe('handleUnreviewedAppsButtonClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
      container.loadApps = jest.fn();
    });

    it('calls loadApps', () => {
      container.handleUnreviewedAppsButtonClick();
      expect(container.loadApps).toHaveBeenCalledTimes(1);
      expect(container.loadApps).toHaveBeenCalledWith('submitted');
    });
  });

  describe('handleApprovedAppsButtonClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
      container.loadApps = jest.fn();
    });

    it('calls loadApps', () => {
      container.handleApprovedAppsButtonClick();
      expect(container.loadApps).toHaveBeenCalledTimes(1);
      expect(container.loadApps).toHaveBeenCalledWith('approved');
    });
  });

  describe('handleDeniedAppsButtonClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
      container.loadApps = jest.fn();
    });

    it('calls loadApps', () => {
      container.handleDeniedAppsButtonClick();
      expect(container.loadApps).toHaveBeenCalledTimes(1);
      expect(container.loadApps).toHaveBeenCalledWith('denied');
    });
  });

  describe('handleAppsLoadClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
      container.loadApps = jest.fn();
    });

    it('calls loadApps', () => {
      container.handleAppsLoadClick();
      expect(container.loadApps).toHaveBeenCalledTimes(1);
      expect(container.loadApps).toHaveBeenCalledWith('submitted');
    });
  });

  describe('handleAppViewClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
      container.state.appData = [
        { appID: 0, name: 'name', whatever: 'whatever' },
        { appID: 1, name: 'whatevername', whatever: 'who knows' },
      ];
    });

    it('sets state as expected', () => {
      container.handleAppViewClick(0);
      expect(container.state.isViewModalOpen).toEqual(true);
      expect(container.state.selectedAppToView).toEqual(
        {
          appID: 0, name: 'name', whatever: 'whatever',
        },
      );
    });
  });

  describe('handleAppViewGoBackClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });
    it('sets state as expected', () => {
      container.state.isViewModalOpen = true;
      container.handleAppViewGoBackClick();
      expect(container.state.isViewModalOpen).toEqual(false);
    });
  });

  describe('updateAppStatus', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="sometokenhere" />).instance();
    });

    it('calls updateAppStatusService', () => {
      container.updateAppStatus(0, 'newStatus');
      expect(updateAppStatusService).toHaveBeenCalledTimes(1);
      expect(updateAppStatusService).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        0,
        'newStatus',
        'sometokenhere',
      );
    });

    it('sets state as expected', () => {
      container.state.isViewModalOpen = true;
      container.state.isAppDeleteSuccessful = true;
      container.state.isAppDeleteFailed = true;
      container.updateAppStatus();

      expect(container.state.isAppsLoading).toEqual(true);
      expect(container.state.isViewModalOpen).toEqual(false);
      expect(container.state.isAppDeleteFailed).toEqual(false);
      expect(container.state.isAppDeleteSuccessful).toEqual(false);
    });

    describe('successful call', () => {
      beforeEach(() => {
        updateAppStatusService.mockImplementation((success) => {
          success();
        });

        container.state.appData = [
          { appID: 0, name: 'aName', status: 'submitted' },
          { appID: 1, name: 'bName', status: 'submitted' },
        ];
      });

      it('sets state as expected', () => {
        container.state.isAppStatusUpdateFailed = true;
        container.state.selectedAppToView = { appID: 3, name: 'cName', status: 'submitted' };
        container.updateAppStatus(0, 'newStatus');

        expect(container.state.isAppStatusUpdateSuccessful).toEqual(true);
        expect(container.state.isAppStatusUpdateFailed).toEqual(false);
        expect(container.state.selectedAppToView).toEqual({});
        expect(container.state.appData).toEqual([
          { appID: 0, name: 'aName', status: 'newStatus' },
          { appID: 1, name: 'bName', status: 'submitted' },
        ]);
        expect(container.state.isAppsLoading).toEqual(false);
      });
    });

    describe('failed call', () => {
      const error = new Error('error');
      beforeEach(() => {
        updateAppStatusService.mockImplementation((success, failure) => {
          failure(error);
        });
      });

      it('sets state as expected', () => {
        container.state.isAppStatusUpdateSuccessful = true;
        container.updateAppStatus(0, 'newStatus');

        expect(container.state.isAppStatusUpdateSuccessful).toEqual(false);
        expect(container.state.isAppStatusUpdateFailed).toEqual(true);
        expect(container.state.appUpdateStatusError).toEqual(error);
        expect(container.state.isAppsLoading).toEqual(false);
      });
    });
  });

  describe('handleAppViewApproveClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('calls updateAppStatus', () => {
      container.updateAppStatus = jest.fn();
      container.handleAppViewApproveClick(0);
      expect(container.updateAppStatus).toHaveBeenCalledTimes(1);
      expect(container.updateAppStatus).toHaveBeenCalledWith(0, 'approved');
    });
  });

  describe('handleAppViewDenyClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('calls updateAppStatus', () => {
      container.updateAppStatus = jest.fn();
      container.handleAppViewDenyClick(0);
      expect(container.updateAppStatus).toHaveBeenCalledTimes(1);
      expect(container.updateAppStatus).toHaveBeenCalledWith(0, 'denied');
    });
  });

  describe('handleAppDeleteButtonClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="sometokenhere" />).instance();
      container.state.appData = [
        { appID: 0, name: 'aName' },
        { appID: 1, name: 'bName' },
      ];
    });

    it('sets state as expected', () => {
      container.state.isViewModalOpen = true;
      container.state.isAppStatusUpdateSuccessful = true;
      container.state.isAppStatusUpdateFailed = true;
      container.handleAppDeleteButtonClick(0);

      expect(container.state.isAppsLoading).toEqual(true);
      expect(container.state.isViewModalOpen).toEqual(false);
      expect(container.state.isAppStatusUpdateSuccessful).toEqual(false);
      expect(container.state.isAppStatusUpdateFailed).toEqual(false);
    });

    it('calls deleteAppService', () => {
      container.handleAppDeleteButtonClick(0);
      expect(deleteAppService).toHaveBeenCalledTimes(1);
      expect(deleteAppService).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        0,
        'sometokenhere',
      );
    });

    describe('successful call', () => {
      beforeEach(() => {
        deleteAppService.mockImplementation((success) => {
          success();
        });
      });

      it('sets state as expected', () => {
        container.state.isAppDeleteFailed = true;
        container.state.selectedAppToView = { appID: 3, name: 'cName' };
        container.handleAppDeleteButtonClick(0);

        expect(container.state.isAppsLoading).toEqual(false);
        expect(container.state.isAppDeleteSuccessful).toEqual(true);
        expect(container.state.isAppDeleteFailed).toEqual(false);
        expect(container.state.selectedAppToView).toEqual({});
        expect(container.state.appData).toEqual([
          { appID: 1, name: 'bName' },
        ]);
      });
    });

    describe('failed call', () => {
      const error = new Error('error');
      beforeEach(() => {
        deleteAppService.mockImplementation((success, failure) => {
          failure(error);
        });
      });

      it('sets state as expected', () => {
        container.state.isAppDeleteSuccessful = true;
        container.handleAppDeleteButtonClick(0);

        expect(container.state.isAppsLoading).toEqual(false);
        expect(container.state.isAppDeleteSuccessful).toEqual(false);
        expect(container.state.isAppDeleteFailed).toEqual(true);
        expect(container.state.appDeleteError).toEqual(error);
      });
    });
  });

  describe('loadImageInformation', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('sets state as expected and calls service', () => {
      container.state.isImagesLoading = false;
      container.state.imageLoadingError = '';
      container.loadImageInformation(false);
      expect(container.state.isImagesLoading).toEqual(true);
      expect(container.state.imageLoadingError).toBeUndefined();
      expect(retrieveGalleryImagesService).toHaveBeenCalledTimes(1);
      expect(retrieveGalleryImagesService).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        false,
      );
    });

    describe('successful call', () => {
      beforeEach(() => {
        retrieveGalleryImagesService.mockImplementation((success, failure, isFeatured) => {
          expect(isFeatured).toEqual(true);
          success([{}, {}, {}, {}]);
        });
      });

      it('sets state as expected', () => {
        container.state.isImagesLoading = true;
        container.state.imageINformation = '';
        container.loadImageInformation(true);
        expect(container.state.isImagesLoading).toEqual(false);
        expect(container.state.imageInformation).toEqual([{}, {}, {}, {}]);
      });
    });

    describe('failed call', () => {
      let error;
      beforeEach(() => {
        error = new Error('error');
        retrieveGalleryImagesService.mockImplementation((success, failure, isFeatured) => {
          expect(isFeatured).toEqual(false);
          failure(error);
        });
      });

      it('sets state as expected', () => {
        container.state.isImagesLoading = true;
        container.state.imageLoadingError = undefined;
        container.loadImageInformation(false);
        expect(container.state.isImagesLoading).toEqual(false);
        expect(container.state.imageLoadingError).toEqual(error);
      });
    });
  });

  describe('handleLoadAllImagesClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('calls loadImageInformation', () => {
      container.loadImageInformation = jest.fn();
      container.handleLoadAllImagesClick();
      expect(container.loadImageInformation).toHaveBeenCalledTimes(1);
      expect(container.loadImageInformation).toHaveBeenCalledWith(false);
    });
  });

  describe('handleLoadFeaturedImagesClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('calls loadImageInformation', () => {
      container.loadImageInformation = jest.fn();
      container.handleLoadFeaturedImagesClick();
      expect(container.loadImageInformation).toHaveBeenCalledTimes(1);
      expect(container.loadImageInformation).toHaveBeenCalledWith(true);
    });
  });

  describe('handleViewImageClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('sets state as expected', () => {
      container.state.imageInformation = [
        { id: 0, title: 'some title' },
        { id: 12, title: 'some other title' },
      ];
      container.state.isImageViewModalOpen = false;
      container.state.selectedImageInfoToView = {};
      container.handleViewImageClick(12);
      expect(container.state.isImageViewModalOpen).toEqual(true);
      expect(container.state.selectedImageInfoToView).toEqual({ id: 12, title: 'some other title' });
    });
  });

  describe('handleViewImageGoBackClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('sets state as expected', () => {
      container.state.isImageViewModalOpen = true;
      container.state.selectedImageInfoToView = { id: 12, title: 'something' };
      container.handleViewImageGoBackClick();
      expect(container.state.isImageViewModalOpen).toEqual(false);
      expect(container.state.selectedImageInfoToView).toEqual({});
    });
  });

  describe('handleViewImageDeleteButtonClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="sometokenhere" />).instance();
    });

    it('sets state as expected and calls service', () => {
      container.state.isImageViewModalOpen = true;
      container.state.isImagesLoading = false;
      container.state.isImageToggleUpdateSuccessful = true;
      container.state.isImageDeleteSuccessful = true;
      container.state.selectedImageInfoToView = { id: 12 };
      container.handleViewImageDeleteButtonClick(1);
      expect(container.state.isImageViewModalOpen).toEqual(false);
      expect(container.state.isImagesLoading).toEqual(true);
      expect(container.state.isImageToggleUpdateSuccessful).toEqual(false);
      expect(container.state.isImageDeleteSuccessful).toEqual(false);
      expect(container.state.selectedImageInfoToView).toEqual({});
      expect(deleteImageService).toHaveBeenCalledTimes(1);
      expect(deleteImageService).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        1,
        'sometokenhere',
      );
    });

    describe('successful call', () => {
      beforeEach(() => {
        deleteImageService.mockImplementation((success) => {
          success();
        });
      });

      it('sets state as expected', () => {
        container.state.isImagesLoading = true;
        container.state.isImageDeleteSuccessful = false;
        container.state.imageLoadingError = {};
        container.state.imageInformation = [
          { id: 2, title: 'title2' },
          { id: 3, title: 'title3' },
          { id: 4, title: 'title4' },
        ];

        container.handleViewImageDeleteButtonClick(3);
        expect(container.state.isImagesLoading).toEqual(false);
        expect(container.state.isImageDeleteSuccessful).toEqual(true);
        expect(container.state.imageLoadingError).toEqual(undefined);
        expect(container.state.imageInformation).toEqual([
          { id: 2, title: 'title2' },
          { id: 4, title: 'title4' },
        ]);
      });
    });

    describe('failed call', () => {
      let error;
      beforeEach(() => {
        error = new Error('error');
        deleteImageService.mockImplementation((success, failure) => {
          failure(error);
        });
      });

      it('sets state as expected', () => {
        container.state.isImagesLoading = true;
        container.state.imageLoadingError = {};
        container.handleViewImageDeleteButtonClick(3);
        expect(container.state.isImagesLoading).toEqual(false);
        expect(container.state.imageLoadingError).toEqual(error);
      });
    });
  });

  describe('handleViewImageToggleFeaturedButtonClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="sometokenhere" />).instance();
    });

    it('sets state as expected and calls service', () => {
      container.state.isImageViewModalOpen = true;
      container.state.isImagesLoading = false;
      container.state.isImageToggleUpdateSuccessful = true;
      container.state.isImageDeleteSuccessful = true;
      container.state.selectedImageInfoToView = { id: 12 };
      container.handleViewImageToggleFeaturedButtonClick(3);
      expect(container.state.isImageViewModalOpen).toEqual(false);
      expect(container.state.isImagesLoading).toEqual(true);
      expect(container.state.isImageToggleUpdateSuccessful).toEqual(false);
      expect(container.state.isImageDeleteSuccessful).toEqual(false);
      expect(container.state.selectedImageInfoToView).toEqual({});
      expect(toggleFeaturedImageService).toHaveBeenCalledTimes(1);
      expect(toggleFeaturedImageService).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        3,
        'sometokenhere',
      );
    });

    describe('successful call', () => {
      beforeEach(() => {
        toggleFeaturedImageService.mockImplementation((success) => {
          success();
        });
      });

      it('sets state as expected', () => {
        container.state.isImagesLoading = true;
        container.state.isImageToggleUpdateSuccessful = false;
        container.state.imageInformation = [
          { id: 3, isFeatured: false },
          { id: 5, isFeatured: true },
        ];
        container.state.imageLoadingError = {};
        container.handleViewImageToggleFeaturedButtonClick(3);
        expect(container.state.isImagesLoading).toEqual(false);
        expect(container.state.isImageToggleUpdateSuccessful).toEqual(true);
        expect(container.state.imageInformation).toEqual([
          { id: 3, isFeatured: true },
          { id: 5, isFeatured: true },
        ]);
        expect(container.state.imageLoadingError).toBeUndefined();
      });
    });

    describe('failed call', () => {
      let error;
      beforeEach(() => {
        error = new Error('error');
        toggleFeaturedImageService.mockImplementation((success, fail) => {
          fail(error);
        });
      });

      it('sets state as expected', () => {
        container.state.isImagesLoading = true;
        container.state.imageLoadingError = {};
        container.handleViewImageToggleFeaturedButtonClick(3);
        expect(container.state.isImagesLoading).toEqual(false);
        expect(container.state.imageLoadingError).toEqual(error);
      });
    });
  });

  describe('handleUploadNewButtonClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('sets state as expected', () => {
      container.state.isUploadModalOpen = false;
      container.handleUploadNewButtonClick();
      expect(container.state.isUploadModalOpen).toEqual(true);
    });
  });

  describe('handleUploadModalGoBackClick', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer jwtToken="" />).instance();
    });

    it('sets state as expected', () => {
      container.state.isUploadModalOpen = true;
      container.handleUploadModalGoBackClick();
      expect(container.state.isUploadModalOpen).toEqual(false);
    });
  });
});
