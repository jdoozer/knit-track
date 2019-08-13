
const MOCK_SERVER_URL = '/api/';

const fetchThunk = ({
  requestAction = (() => {}),
  receiveAction = (() => {}),
  errorAction = (() => {}),
  body = null,
  path = '',
  host = MOCK_SERVER_URL,
  requestType = 'GET',
}) => {
  let fetchObj = {
    method: requestType,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  if (['POST', 'PUT', 'PATCH'].includes(requestType)) {
    fetchObj.body = JSON.stringify(body);
  }

  return dispatch => {
    dispatch(requestAction);
    return fetch(`${host}/${path}`, fetchObj)
      // .then(response => {debugger; return response.json()})
      .then(response => response.json())
      .then(json => dispatch(receiveAction(json)))
      .catch(error => dispatch(errorAction(`${error.name}: ${error.message}`)))
  }
};

export default fetchThunk;
