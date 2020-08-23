import axios from 'axios';

const APPLICATION_PATH = '/applicationsubmit';

const submitApplicationService = (successCallback, failureCallback, applicationInformation) => {
  axios.post(
    APPLICATION_PATH,
    {
      applicationInformation,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
    .then(successCallback)
    .catch(failureCallback);
};

export default submitApplicationService;
