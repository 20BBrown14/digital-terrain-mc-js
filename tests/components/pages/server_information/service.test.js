import axios from 'axios';
import serverInformationService from '../../../../src/components/pages/server_information/service';

jest.mock('axios');

const flushPromises = () => new Promise(setImmediate);

describe('serverInformationService', () => {
  beforeEach(() => {
    axios.mockClear();
  });

  describe('successful response', () => {
    describe('responds with data', () => {
      beforeEach(() => {
        axios.get.mockImplementation((path) => new Promise((resolve) => {
          expect(path).toEqual('/serverInformation');
          resolve({ data: 'success' });
        }));
      });

      it('calls success callback', async () => {
        const success = jest.fn();
        serverInformationService(success, () => {});
        await flushPromises();
        expect(success).toHaveBeenCalledTimes(1);
        expect(success).toHaveBeenCalledWith('success');
      });
    });
  });

  describe('responds without data', () => {
    beforeEach(() => {
      axios.get.mockImplementation((path) => new Promise((resolve) => {
        expect(path).toEqual('/serverInformation');
        resolve({});
      }));
    });

    it('calls failure callback', async () => {
      const failure = jest.fn();
      serverInformationService(() => {}, failure);
      await flushPromises();
      expect(failure).toHaveBeenCalledTimes(1);
    });
  });

  describe('call fails', () => {
    beforeEach(() => {
      axios.get.mockImplementation((path) => new Promise((resolve, reject) => {
        expect(path).toEqual('/serverInformation');
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('failure');
      }));
    });

    it('calls failure callback', async () => {
      const failure = jest.fn();
      serverInformationService(() => {}, failure);
      await flushPromises();
      expect(failure).toHaveBeenCalledTimes(1);
    });
  });
});
