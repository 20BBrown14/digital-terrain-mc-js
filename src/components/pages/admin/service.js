import axios from 'axios';
import DataSaveError from '../../../modules/DataSaveError';
import UnexpectedDataError from '../../../modules/UnexpectedDataError';

const SAVE_JSON_PATH = '/save';
const LOAD_APPS_PATH = '/loadApps';
const UPDATE_APP_STATUS_PATH = '/updateappstatus';
const DELETE_APP_PATH = '/deleteapp';
const DELETE_IMAGE_PATH = '/deleteImage';
const TOGGLE_FEATURED_IMAGE_PATH = '/toggleFeaturedImage';

export const saveJSONInformationService = (successCallback, failureCallback, JSONTypeToSave, JSONToSave, jwtToken) => {
  axios.post(
    `${SAVE_JSON_PATH}?JSONTypeToSave=${JSONTypeToSave}`,
    {
      JSON: JSONToSave,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: jwtToken,
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

export const loadAppsService = (successCallback, failureCallback, applicationFilter, jwtToken) => {
  axios.get(
    `${LOAD_APPS_PATH}?applicationFilter=${applicationFilter}`,
    {
      headers: {
        Authorization: jwtToken,
      },
    },
  )
    .then((response) => {
      const responseData = response.data;
      if (responseData) {
        successCallback(responseData);
      }
    })
    .catch(failureCallback);
};

export const updateAppStatusService = (successCallback, failureCallback, appID, newStatus, jwtToken) => {
  axios.post(
    UPDATE_APP_STATUS_PATH,
    {
      appID,
      newStatus,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: jwtToken,
      },
    },
  )
    .then(successCallback)
    .catch(failureCallback);
};

export const deleteAppService = (successCallback, failureCallback, appID, jwtToken) => {
  axios.post(
    DELETE_APP_PATH,
    {
      appID,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: jwtToken,
      },
    },
  )
    .then(successCallback)
    .catch(failureCallback);
};

export const deleteImageService = (successCallback, failureCallback, imageID, jwtToken) => {
  axios.post(
    DELETE_IMAGE_PATH,
    {
      imageID,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: jwtToken,
      },
    },
  )
    .then(successCallback)
    .catch(failureCallback);
};

export const toggleFeaturedImageService = (successCallback, failureCallback, imageID, jwtToken) => {
  axios.post(
    TOGGLE_FEATURED_IMAGE_PATH,
    {
      imageID,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: jwtToken,
      },
    },
  )
    .then(successCallback)
    .catch(failureCallback);
};
