
const MOCK_SERVER_URL = '/api/';

const fetchActionCreator = ({
  requestAction,
  receiveAction,
  errorAction,
  body,
  path,
  host=MOCK_SERVER_URL,
  requestType
}) => {
  let fetchObj = {
    method: requestType,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  if (requestType === 'POST')  fetchObj.body = JSON.stringify(body);

  return dispatch => {
    dispatch(requestAction);
    return fetch(`${host}/${path}`, fetchObj)
      .then(response => response.json())
      .then(json => dispatch(receiveAction(json)))
      .catch(error => dispatch(errorAction(`${error.name}: ${error.message}`)))
  }
};

export default fetchActionCreator
