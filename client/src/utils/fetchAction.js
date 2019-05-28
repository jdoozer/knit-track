
const MOCK_SERVER_URL = '/api/';

const fetchAction = ({
  requestAction, receiveAction, body,
  path, host=MOCK_SERVER_URL, requestType
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
    return fetch(`${host}/${path}`, fetchObj).then(
        // response => { debugger; return response.json() },
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(
        json => dispatch(receiveAction(json))
      );
  }
};

export default fetchAction;
