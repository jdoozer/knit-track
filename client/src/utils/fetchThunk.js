
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
    .then(response =>
      response.json()
      .then(json => ({ status: response.status, json })
    ))
    .then(({ status, json }) => (
      (status === 200) ?
        dispatch(receiveAction(json)) :
        dispatch(errorAction({ status, message: json.error }))
    ))
    .catch(error => dispatch(errorAction({ message: error.toString() })))
  }
};

export default fetchThunk;
