import Axios from 'axios';
import retrieveGalleryImagesService from '../../../../src/components/pages/gallery/service';

jest.mock('axios');

const flushPromises = () => new Promise(setImmediate);

describe('retrieveGalleryImages service', () => {
  beforeEach(() => {
    Axios.mockClear();
  });

  describe('successful call', () => {
    beforeEach(() => {
      Axios.get.mockImplementation((path) => new Promise((resolve) => {
        expect(path).toEqual('/galleryImages?isFeatured=false');
        resolve({ data: [{}, {}, {}, {}] });
      }));
    });

    it('calls success callback', async () => {
      const successMock = jest.fn();
      retrieveGalleryImagesService(successMock, () => {});
      await flushPromises();
      expect(successMock).toHaveBeenCalledTimes(1);
      expect(successMock).toHaveBeenCalledWith([{}, {}, {}, {}]);
    });
  });

  describe('failed call', () => {
    beforeEach(() => {
      Axios.get.mockImplementation((path) => new Promise((resolve, reject) => {
        expect(path).toEqual('/galleryImages?isFeatured=true');
        reject(new Error('error'));
      }));
    });

    it('calls failure callback', async () => {
      const failedMock = jest.fn();
      retrieveGalleryImagesService(() => {}, failedMock, true);
      await flushPromises();
      expect(failedMock).toHaveBeenCalledTimes(1);
    });
  });
});
