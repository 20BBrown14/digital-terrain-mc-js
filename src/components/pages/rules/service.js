import axios from 'axios';
import ServiceValidationError from '../../../modules/ServiceValidationError';

const RULES_PATH = '/serverRules';

const retrieveRulesInformation = (successCallback, failureCallback) => {
  axios.get(RULES_PATH)
    .then((response) => {
      const responseJson = response.data;
      if (!responseJson) {
        throw new ServiceValidationError('Missing response data');
      }

      successCallback(responseJson);
    })
    .catch(failureCallback);
};

export default retrieveRulesInformation;
