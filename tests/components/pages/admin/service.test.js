import axios from 'axios';
import saveService from '../../../../src/components/pages/admin/service';

jest.mock('axios');

const flushPromises = () => new Promise(setImmediate);

describe('save service', () => {
  beforeEach(() => {
    axios.mockClear();
  });

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
      saveService(successHandler, () => {}, 'rules', { json: 'json' });
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
      saveService(() => {}, failureCallback, 'rules', { json: 'json' });
      await flushPromises();
      expect(failureCallback).toHaveBeenCalledTimes(1);
    });
  });
});
