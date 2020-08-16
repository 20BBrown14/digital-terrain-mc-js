import axios from 'axios';
import aboutUsServices from '../../../../src/components/pages/about_us/service';

jest.mock('axios');

const flushPromises = () => new Promise(setImmediate);

describe('about us page services', () => {
  beforeEach(() => {
    axios.mockClear();
  });

  describe('retrieveAboutUsInformation ', () => {
    describe('successful response', () => {
      describe('responds with data', () => {
        beforeEach(() => {
          axios.get.mockImplementation((path) => new Promise((resolve) => {
            expect(path).toEqual('/aboutUsInformation');
            resolve({ data: 'success' });
          }));
        });

        it('calls success callback', async () => {
          const success = jest.fn();
          aboutUsServices.retrieveAboutUsInformation(success, () => {});
          await flushPromises();
          expect(success).toHaveBeenCalledTimes(1);
          expect(success).toHaveBeenCalledWith('success');
        });
      });
    });

    describe('responds without data', () => {
      beforeEach(() => {
        axios.get.mockImplementation((path) => new Promise((resolve) => {
          expect(path).toEqual('/aboutUsInformation');
          resolve({});
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        aboutUsServices.retrieveAboutUsInformation(() => {}, failure);
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
      });
    });

    describe('call fails', () => {
      beforeEach(() => {
        axios.get.mockImplementation((path) => new Promise((resolve, reject) => {
          expect(path).toEqual('/aboutUsInformation');
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('failure');
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        aboutUsServices.retrieveAboutUsInformation(() => {}, failure);
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('retrieveVeteransInformation  ', () => {
    describe('successful response', () => {
      describe('responds with data', () => {
        beforeEach(() => {
          axios.get.mockImplementation((path) => new Promise((resolve) => {
            expect(path).toEqual('/veteransInformation');
            resolve({ data: 'success' });
          }));
        });

        it('calls success callback', async () => {
          const success = jest.fn();
          aboutUsServices.retrieveVeteransInformation(success, () => {});
          await flushPromises();
          expect(success).toHaveBeenCalledTimes(1);
          expect(success).toHaveBeenCalledWith('success');
        });
      });
    });

    describe('responds without data', () => {
      beforeEach(() => {
        axios.get.mockImplementation((path) => new Promise((resolve) => {
          expect(path).toEqual('/veteransInformation');
          resolve({});
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        aboutUsServices.retrieveVeteransInformation(() => {}, failure);
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
      });
    });

    describe('call fails', () => {
      beforeEach(() => {
        axios.get.mockImplementation((path) => new Promise((resolve, reject) => {
          expect(path).toEqual('/veteransInformation');
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('failure');
        }));
      });

      it('calls failure callback', async () => {
        const failure = jest.fn();
        aboutUsServices.retrieveVeteransInformation(() => {}, failure);
        await flushPromises();
        expect(failure).toHaveBeenCalledTimes(1);
      });
    });
  });
});
