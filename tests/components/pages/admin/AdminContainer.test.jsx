import React from 'react';
import AdminContainer from '../../../../src/components/pages/admin/AdminContainer';
import saveService from '../../../../src/components/pages/admin/service';
import rulesService from '../../../../src/components/pages/rules/service';
import serverInformationService from '../../../../src/components/pages/server_information/service';
import aboutUsInformationService from '../../../../src/components/pages/about_us/service';

jest.mock('../../../../src/components/pages/admin/service');
jest.mock('../../../../src/components/pages/rules/service');
jest.mock('../../../../src/components/pages/server_information/service');
jest.mock('../../../../src/components/pages/about_us/service');

describe('AdminContainer', () => {
  beforeEach(() => {
    aboutUsInformationService.retrieveAboutUsInformation = jest.fn();
    aboutUsInformationService.retrieveVeteransInformation = jest.fn();
  });

  afterEach(() => {
    saveService.mockClear();
    rulesService.mockClear();
    serverInformationService.mockClear();
    aboutUsInformationService.retrieveAboutUsInformation.mockClear();
    aboutUsInformationService.retrieveVeteransInformation.mockClear();
  });

  it('renders a default view', () => {
    const container = render(<AdminContainer />);
    expect(container).toMatchSnapshot();
  });

  it('has a default state', () => {
    const expectedState = {
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

    const container = shallow(<AdminContainer />).instance();
    expect(container.state).toEqual(expectedState);
  });

  it('has empty cached json', () => {
    const expectedCachedJSON = {
      rules: '',
      serverInformation: '',
      aboutUsInformation: '',
      veteransInformation: '',
    };

    const container = shallow(<AdminContainer />).instance();
    expect(container.cachedJSON).toEqual(expectedCachedJSON);
  });

  describe('getJSONEditorRef', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer />).instance();
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
      container = shallow(<AdminContainer />).instance();
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
        it('calls saveService', () => {
          saveService.mockClear();
          container.saveJSON();

          expect(saveService).toHaveBeenCalledTimes(1);
          expect(saveService).toHaveBeenCalledWith(expect.any(Function), expect.any(Function), 'rules', {});
        });

        describe('successful service call', () => {
          beforeEach(() => {
            saveService.mockImplementation((success) => {
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
              isFailed: false,
              isSaveSuccessful: true,
            };

            container.state.isDirty = true;
            container.state.selectedJSON = 'non-empty string';
            container.state.tentativeSelectedJSON = 'non-empty string';
            container.state.edittedJSON = { json: 'json' };
            container.state.isSaveLoading = true;
            container.state.isFailed = true;

            container.saveJSON();

            expect(container.state.isDirty).toEqual(expectedState.isDirty);
            expect(container.state.selectedJSON).toEqual(expectedState.selectedJSON);
            expect(container.state.tentativeSelectedJSON).toEqual(expectedState.tentativeSelectedJSON);
            expect(container.state.EdittedJSON).toEqual(expectedState.EdittedJSON);
            expect(container.state.isSaveLoading).toEqual(expectedState.isSaveLoading);
            expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
            saveService.mockImplementation((success, failure) => {
              failure({ failed: 'failed' });
            });
          });

          it('sets state as expected', () => {
            container.state.isFailed = false;
            container.state.isSaveLoading = true;

            container.saveJSON();

            expect(container.state.isFailed).toEqual(true);
            expect(container.state.isSaveLoading).toEqual(false);
            expect(container.state.error).toEqual({ failed: 'failed' });
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
      container = shallow(<AdminContainer />).instance();
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
      container = shallow(<AdminContainer />).instance();
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
              isFailed: false,
              selectedJSON: 'rules',
              tentativeSelectedJSON: '',
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isFailed = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
              error: { failed: 'failed' },
              isJSONLoading: false,
              isFailed: true,
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.error).toEqual(expectedState.error);
            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
            isFailed: false,
            selectedJSON: 'rules',
            tentativeSelectedJSON: '',
            isSaveSuccessful: false,
          };

          container.state.isJSONLoading = true;
          container.state.isFailed = true;
          container.state.isSaveSuccessful = true;

          container.loadNewJSON();

          expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
          expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
              isFailed: false,
              selectedJSON: 'serverInformation',
              tentativeSelectedJSON: '',
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isFailed = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
              error: { failed: 'failed' },
              isJSONLoading: false,
              isFailed: true,
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.error).toEqual(expectedState.error);
            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
            isFailed: false,
            selectedJSON: 'serverInformation',
            tentativeSelectedJSON: '',
            isSaveSuccessful: false,
          };

          container.state.isJSONLoading = true;
          container.state.isFailed = true;
          container.state.isSaveSuccessful = true;

          container.loadNewJSON();

          expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
          expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
              isFailed: false,
              selectedJSON: 'aboutUsInformation',
              tentativeSelectedJSON: '',
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isFailed = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
              error: { failed: 'failed' },
              isJSONLoading: false,
              isFailed: true,
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.error).toEqual(expectedState.error);
            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
            isFailed: false,
            selectedJSON: 'aboutUsInformation',
            tentativeSelectedJSON: '',
            isSaveSuccessful: false,
          };

          container.state.isJSONLoading = true;
          container.state.isFailed = true;
          container.state.isSaveSuccessful = true;

          container.loadNewJSON();

          expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
          expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
              isFailed: false,
              selectedJSON: 'veteransInformation',
              tentativeSelectedJSON: '',
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isFailed = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
              error: { failed: 'failed' },
              isJSONLoading: false,
              isFailed: true,
              isSaveSuccessful: false,
            };

            container.state.isJSONLoading = true;
            container.state.isSaveSuccessful = true;

            container.loadNewJSON();

            expect(container.state.error).toEqual(expectedState.error);
            expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
            expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
            isFailed: false,
            selectedJSON: 'veteransInformation',
            tentativeSelectedJSON: '',
            isSaveSuccessful: false,
          };

          container.state.isJSONLoading = true;
          container.state.isFailed = true;
          container.state.isSaveSuccessful = true;

          container.loadNewJSON();

          expect(container.state.isJSONLoading).toEqual(expectedState.isJSONLoading);
          expect(container.state.isFailed).toEqual(expectedState.isFailed);
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
        expect(container.state.isFailed).toEqual(true);
        expect(container.state.error).toEqual({ message: 'Unexpected value for json to edit' });
      });
    });
  });

  describe('handleEditJSONButton', () => {
    let container;
    beforeEach(() => {
      container = shallow(<AdminContainer />).instance();
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
      container = shallow(<AdminContainer />).instance();
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
      container = shallow(<AdminContainer />).instance();
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
      container = shallow(<AdminContainer />).instance();
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
      container = shallow(<AdminContainer />).instance();
    });

    it('sets state as expected', () => {
      container.state.isDiscardChangesModalOpen = true;
      container.handleGoBackSaveButtonClick();

      expect(container.state.isDiscardChangesModalOpen).toEqual(false);
    });
  });
});
