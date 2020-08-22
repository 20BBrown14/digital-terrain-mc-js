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
              },
            },
          );

          resolve({ data: { json: 'json' } });
        }));
      });

      it('calls success handler', async () => {
        const successHandler = jest.fn();
        saveJSONInformationService(successHandler, () => {}, 'rules', { json: 'json' });
        await flushPromises();
        expect(successHandler).toHaveBeenCalledTimes(1);
        expect(successHandler).toHaveBeenCalledWith({ json: 'json' });
      });
    });

    describe('failed call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body, headers) => new Promise((resolve, reject) => {
          expect(path).toEqual('/save?JSONTypeToSave=rules');
          expect(body).toEqual({ JSON: { json: 'json' } });
          expect(headers).toEqual(
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            },
          );

          reject(new Error('error'));
        }));
      });

      it('calls failure callback', async () => {
        const failureCallback = jest.fn();
        saveJSONInformationService(() => {}, failureCallback, 'rules', { json: 'json' });
        await flushPromises();
        expect(failureCallback).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('loadAppsService', () => {
    describe('successful call', () => {
      beforeEach(() => {
        axios.get.mockImplementation((path) => new Promise((resolve) => {
          expect(path).toEqual('/loadApps?applicationFilter=newStatus');
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
        loadAppsService(success, () => {}, 'newStatus');
        await flushPromises();
        expect(success).toHaveBeenCalledTimes(1);
        expect(success).toHaveBeenCalledWith([
          { appID: 0, name: 'aName' },
          { appID: 1, name: 'bName' },
        ]);
      });
    });

    describe('failed call', () => {
      beforeEach(() => {
        axios.get.mockImplementation((path, body) => new Promise((resolve, reject) => {
          expect(path).toEqual('/loadApps?applicationFilter=newStatus');
          expect(body).toEqual([
            { appID: 0, name: 'aName' },
            { appID: 1, name: 'bName' },
          ]);
          reject(new Error('error'));
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        loadAppsService(() => {}, failure, 'newStatus');
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('updateAppStatusService', () => {
    describe('successful call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body) => new Promise((resolve) => {
          expect(path).toEqual('/updateappstatus');
          expect(body).toEqual({ appID: 0, newStatus: 'newStatus' });
          resolve();
        }));
      });

      it('calls success callback', async () => {
        const success = jest.fn();
        updateAppStatusService(success, () => {}, 0, 'newStatus');
        await flushPromises();
        expect(success).toHaveBeenCalledTimes(1);
      });
    });

    describe('failed call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body) => new Promise((resolve, reject) => {
          expect(path).toEqual('/updateappstatus');
          expect(body).toEqual({ appID: 0, newStatus: 'newStatus' });
          reject(new Error('error'));
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        updateAppStatusService(() => {}, failure, 0, 'newStatus');
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('deleteAppService', () => {
    describe('successful call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body) => new Promise((resolve) => {
          expect(path).toEqual('/deleteapp');
          expect(body).toEqual({ appID: 0 });
          resolve();
        }));
      });

      it('calls success callback', async () => {
        const success = jest.fn();
        deleteAppService(success, () => {}, 0);
        await flushPromises();
        expect(success).toHaveBeenCalledTimes(1);
      });
    });

    describe('failed call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body) => new Promise((resolve, reject) => {
          expect(path).toEqual('/deleteapp');
          expect(body).toEqual({ appID: 0 });
          reject();
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        deleteAppService(() => {}, failure, 0);
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('deleteImageService', () => {
    describe('successful call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body) => new Promise((resolve) => {
          expect(path).toEqual('/deleteImage');
          expect(body).toEqual({ imageID: 5 });
          resolve();
        }));
      });

      it('calls success callback', async () => {
        const success = jest.fn();
        deleteImageService(success, () => {}, 5);
        await flushPromises();
        expect(success).toHaveBeenCalledTimes(1);
      });
    });

    describe('failed call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body) => new Promise((resolve, reject) => {
          expect(path).toEqual('/deleteImage');
          expect(body).toEqual({ imageId: 5 });
          reject(new Error('error'));
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        deleteImageService(() => {}, failure, 5);
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('toggleFeaturedImageService ', () => {
    describe('successful call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body) => new Promise((resolve) => {
          expect(path).toEqual('/toggleFeaturedImage');
          expect(body).toEqual({ imageID: 5 });
          resolve();
        }));
      });

      it('calls success callback', async () => {
        const success = jest.fn();
        toggleFeaturedImageService(success, () => {}, 5);
        await flushPromises();
        expect(success).toHaveBeenCalledTimes(1);
      });
    });

    describe('failed call', () => {
      beforeEach(() => {
        axios.post.mockImplementation((path, body) => new Promise((resolve, reject) => {
          expect(path).toEqual('/toggleFeaturedImage');
          expect(body).toEqual({ imageId: 5 });
          reject(new Error('error'));
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        toggleFeaturedImageService(() => {}, failure, 5);
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
      });
    });
  });
});
