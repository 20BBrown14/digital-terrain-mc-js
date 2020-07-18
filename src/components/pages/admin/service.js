import axios from 'axios';
import DataSaveError from '../../../modules/DataSaveError';
import UnexpectedDataError from '../../../modules/UnexpectedDataError';

const SAVE_JSON_PATH = '/save';

const saveJSONInformation = (successCallback, failureCallback, JSONTypeToSave, JSONToSave) => {
  axios.post(
    `${SAVE_JSON_PATH}?JSONTypeToSave=${JSONTypeToSave}`,
    {
      JSON: JSONToSave,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
    .then((response) => {
      const responseJson = response.data;
      if (response.status > 499) {
        throw new DataSaveError('Data failed to save. Please try again later');
      } else if (response.status > 399 && response.status <= 499) {
        throw new UnexpectedDataError('Data or request is illformed. Please try again.');
      } else if (response.status > 299) {
        throw new Error('Unexpected Error while attempting to save data. Please try again later.');
      }

      successCallback(responseJson);
    })
    .catch(failureCallback);
};

export default saveJSONInformation;
