import axios from 'axios';
import ServiceValidationError from '../../../modules/ServiceValidationError';

const SERVER_INFORMATION_PATH = '/serverInformation';

const retrieveServerInformation = (successCallback, failureCallback) => {
  axios.get(SERVER_INFORMATION_PATH)
    .then((response) => {
      const responseJson = response.data;
      if (!responseJson) {
        throw new ServiceValidationError('Missing response data');
      }

      successCallback(responseJson);
    })
    .catch(failureCallback);
};

export default retrieveServerInformation;
