import axios from 'axios';
import ServiceValidationError from '../../../modules/ServiceValidationError';

const ABOUT_US_PATH = '/aboutUsInformation';
const VETERANS_PATH = '/veteransInformation';

const retrieveAboutUsInformation = (successCallback, failureCallback) => {
  axios.get(ABOUT_US_PATH)
    .then((response) => {
      const responseJson = response.data;
      if (!responseJson) {
        throw new ServiceValidationError('Missing response data');
      }

      successCallback(responseJson);
    })
    .catch(failureCallback);
};

const retrieveVeteransInformation = (successCallback, failureCallback) => {
  axios.get(VETERANS_PATH)
    .then((response) => {
      const responseJson = response.data;
      if (!responseJson) {
        throw new ServiceValidationError('Missing response data');
      }

      successCallback(responseJson);
    })
    .catch(failureCallback);
};

export default { retrieveAboutUsInformation, retrieveVeteransInformation };
