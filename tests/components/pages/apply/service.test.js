import Axios from 'axios';
import applicationSubmitService from '../../../../src/components/pages/apply/service';

jest.mock('axios');

const flushPromises = () => new Promise(setImmediate);

describe('applicationSubmitService', () => {
  afterEach(() => {
    Axios.mockClear();
  });

  describe('successful call', () => {
    let mockSuccessCallback;
    beforeEach(() => {
      mockSuccessCallback = jest.fn();
      Axios.post.mockImplementation((path) => new Promise((resolve) => {
        expect(path).toEqual('/applicationsubmit');
        resolve();
      }));
    });

    it('calls success callback', async () => {
      applicationSubmitService(mockSuccessCallback, () => {}, {});
      await flushPromises();
      expect(mockSuccessCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('failed call', () => {
    let mockFailureCallback;
    beforeEach(() => {
      mockFailureCallback = jest.fn();
      Axios.post.mockImplementation((path) => new Promise((resolve, reject) => {
        expect(path).toEqual('/applicationsubmit');
        reject(new Error('error'));
      }));
    });

    it('calls failure callback', async () => {
      applicationSubmitService(() => {}, mockFailureCallback, {});
      await flushPromises();
      expect(mockFailureCallback).toHaveBeenCalledTimes(1);
    });
  });
});
