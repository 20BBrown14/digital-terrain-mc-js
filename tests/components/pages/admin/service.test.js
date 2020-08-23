import axios from 'axios';
import {
  saveJSONInformationService,
  loadAppsService,
  updateAppStatusService,
  deleteAppService,
  deleteImageService,
  toggleFeaturedImageService,
} from '../../../../src/components/pages/admin/service';

jest.mock('axios');

const flushPromises = () => new Promise(setImmediate);

describe('Admin services', () => {
  afterEach(() => {
    axios.mockClear();
  });
  describe('save service', () => {
    describe('successful call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body, headers) => new Promise((resolve) => {
          expect(path).toEqual('/save?JSONTypeToSave=rules');
          expect(body).toEqual({ JSON: { json: 'json' } });
          expect(headers).toEqual(
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'sometokenhere',
              },
            },
          );

          resolve({ data: { json: 'json' } });
        }));
      });

      it('calls success handler', async () => {
        const successHandler = jest.fn();
        saveJSONInformationService(successHandler, () => {}, 'rules', { json: 'json' }, 'sometokenhere');
        await flushPromises();
        expect(successHandler).toHaveBeenCalledTimes(1);
        expect(successHandler).toHaveBeenCalledWith({ json: 'json' });
      });
    });

    describe('failed call', () => {
      let expectedError;
      beforeEach(() => {
        expectedError = new Error('error');
        axios.post.mockImplementation((path, body, headers) => new Promise((resolve, reject) => {
          expect(path).toEqual('/save?JSONTypeToSave=rules');
          expect(body).toEqual({ JSON: { json: 'json' } });
          expect(headers).toEqual(
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'sometokenhere',
              },
            },
          );

          reject(new Error('error'));
        }));
      });

      it('calls failure callback', async () => {
        const failureCallback = jest.fn();
        saveJSONInformationService(() => {}, failureCallback, 'rules', { json: 'json' }, 'sometokenhere');
        await flushPromises();
        expect(failureCallback).toHaveBeenCalledTimes(1);
        expect(failureCallback).toHaveBeenCalledWith(expectedError);
      });
    });
  });

  describe('loadAppsService', () => {
    describe('successful call', () => {
      beforeEach(() => {
        axios.get.mockImplementation((path, headers) => new Promise((resolve) => {
          expect(path).toEqual('/loadApps?applicationFilter=newStatus');
          expect(headers).toEqual({
            headers: {
              Authorization: 'sometokenhere',
            },
          });
          resolve({
            data: [
              { appID: 0, name: 'aName' },
              { appID: 1, name: 'bName' },
            ],
          });
        }));
      });

      it('calls success callback', async () => {
        const success = jest.fn();
        loadAppsService(success, () => {}, 'newStatus', 'sometokenhere');
        await flushPromises();
        expect(success).toHaveBeenCalledTimes(1);
        expect(success).toHaveBeenCalledWith([
          { appID: 0, name: 'aName' },
          { appID: 1, name: 'bName' },
        ]);
      });
    });

    describe('failed call', () => {
      let expectedError;
      beforeEach(() => {
        expectedError = new Error('error');
        axios.get.mockImplementation((path, headers) => new Promise((resolve, reject) => {
          expect(path).toEqual('/loadApps?applicationFilter=newStatus');
          expect(headers).toEqual({
            headers: {
              Authorization: 'sometoken',
            },
          });
          reject(new Error('error'));
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        loadAppsService(() => {}, failure, 'newStatus', 'sometoken');
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
        expect(failure).toHaveBeenCalledWith(expectedError);
      });
    });
  });

  describe('updateAppStatusService', () => {
    describe('successful call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body, headers) => new Promise((resolve) => {
          expect(path).toEqual('/updateappstatus');
          expect(body).toEqual({ appID: 0, newStatus: 'newStatus' });
          expect(headers).toEqual({
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'somejwtToken',
            },
          });
          resolve();
        }));
      });

      it('calls success callback', async () => {
        const success = jest.fn();
        updateAppStatusService(success, () => {}, 0, 'newStatus', 'somejwtToken');
        await flushPromises();
        expect(success).toHaveBeenCalledTimes(1);
      });
    });

    describe('failed call', () => {
      let expectedError;
      beforeEach(() => {
        expectedError = new Error('error');
        axios.post.mockImplementation((path, body, headers) => new Promise((resolve, reject) => {
          expect(path).toEqual('/updateappstatus');
          expect(body).toEqual({ appID: 0, newStatus: 'newStatus' });
          expect(headers).toEqual({
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'somejwtToken',
            },
          });
          reject(new Error('error'));
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        updateAppStatusService(() => {}, failure, 0, 'newStatus', 'somejwtToken');
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
        expect(failure).toHaveBeenCalledWith(expectedError);
      });
    });
  });

  describe('deleteAppService', () => {
    describe('successful call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body, headers) => new Promise((resolve) => {
          expect(path).toEqual('/deleteapp');
          expect(body).toEqual({ appID: 0 });
          expect(headers).toEqual({
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'somejwtToken',
            },
          });
          resolve();
        }));
      });

      it('calls success callback', async () => {
        const success = jest.fn();
        deleteAppService(success, () => {}, 0, 'somejwtToken');
        await flushPromises();
        expect(success).toHaveBeenCalledTimes(1);
      });
    });

    describe('failed call', () => {
      let expectedError;
      beforeEach(() => {
        expectedError = new Error('error');
        axios.post.mockImplementation((path, body, headers) => new Promise((resolve, reject) => {
          expect(path).toEqual('/deleteapp');
          expect(body).toEqual({ appID: 0 });
          expect(headers).toEqual({
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'somejwtToken',
            },
          });
          reject(expectedError);
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        deleteAppService(() => {}, failure, 0, 'somejwtToken');
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
        expect(failure).toHaveBeenCalledWith(expectedError);
      });
    });
  });

  describe('deleteImageService', () => {
    describe('successful call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body, headers) => new Promise((resolve) => {
          expect(path).toEqual('/deleteImage');
          expect(body).toEqual({ imageID: 5 });
          expect(headers).toEqual({
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'somejwtToken',
            },
          });
          resolve();
        }));
      });

      it('calls success callback', async () => {
        const success = jest.fn();
        deleteImageService(success, () => {}, 5, 'somejwtToken');
        await flushPromises();
        expect(success).toHaveBeenCalledTimes(1);
      });
    });

    describe('failed call', () => {
      let expectedError;
      beforeEach(() => {
        expectedError = new Error('error');
        axios.post.mockImplementation((path, body, headers) => new Promise((resolve, reject) => {
          expect(path).toEqual('/deleteImage');
          expect(body).toEqual({ imageID: 5 });
          expect(headers).toEqual({
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'somejwtToken',
            },
          });
          reject(new Error('error'));
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        deleteImageService(() => {}, failure, 5, 'somejwtToken');
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
        expect(failure).toHaveBeenCalledWith(expectedError);
      });
    });
  });

  describe('toggleFeaturedImageService ', () => {
    describe('successful call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body, headers) => new Promise((resolve) => {
          expect(path).toEqual('/toggleFeaturedImage');
          expect(body).toEqual({ imageID: 5 });
          expect(headers).toEqual({
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'somejwtToken',
            },
          });
          resolve();
        }));
      });

      it('calls success callback', async () => {
        const success = jest.fn();
        toggleFeaturedImageService(success, () => {}, 5, 'somejwtToken');
        await flushPromises();
        expect(success).toHaveBeenCalledTimes(1);
      });
    });

    describe('failed call', () => {
      let expectedError;
      beforeEach(() => {
        expectedError = new Error('error');
        axios.post.mockImplementation((path, body, headers) => new Promise((resolve, reject) => {
          expect(path).toEqual('/toggleFeaturedImage');
          expect(body).toEqual({ imageID: 5 });
          expect(headers).toEqual({
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'somejwtToken',
            },
          });
          reject(expectedError);
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        toggleFeaturedImageService(() => {}, failure, 5, 'somejwtToken');
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
        expect(failure).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});
