import axios from 'axios';
import ServiceValidationError from '../../../modules/ServiceValidationError';

const RETRIEVE_IMAGES_PATH = '/galleryImages';

const retrieveGalleryImages = (successCallback, failureCallback, isFeatured = false) => {
  axios.get(`${RETRIEVE_IMAGES_PATH}?isFeatured=${isFeatured}`)
    .then((response) => {
      const responseJson = response.data;
      if (!responseJson) {
        throw new ServiceValidationError('Missing response data');
      }

      successCallback(responseJson);
    })
    .catch(failureCallback);
};

export default retrieveGalleryImages;
