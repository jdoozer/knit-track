
const server = (process.env.NODE_ENV === 'development')
  ? '/api'
  : 'https://us-central1-knit-track.cloudfunctions.net/api';

function fetchThunkWithRedirect({
  requestAction = (() => {}),
  receiveAction = (() => {}),
  errorAction = (() => {}),
  body = null,
  path = '',
  host = server,
  requestType = 'GET',
  successRedirect = null,
  errorRedirect = null,
  history = [],
}) {
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
    .then(({ status, json }) => {
      if (status === 200)
        return dispatch(receiveAction(json));
      throw json.error;
    })
    .then(({ payload }) => {
      if (successRedirect) {
        if (typeof successRedirect === 'string')
          return history.push(successRedirect);
        if (typeof successRedirect === 'function')
          return history.push(successRedirect(payload));
      }
      return null;
    })
    .catch(error => {
      dispatch(errorAction({ status: 500, message: error.message }));
      if (errorRedirect)
        history.push(errorRedirect);
    })
  };
}

export default fetchThunkWithRedirect;
