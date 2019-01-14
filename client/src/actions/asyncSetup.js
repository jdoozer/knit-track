import { createAction, createActions } from 'redux-actions';

export const MOCK_SERVER_URL = 'api/';

// SETUP ACTIONS

export const {
  requestPatterns, requestPatternExpanded, requestSectionExpanded
} = createActions(
  'REQUEST_PATTERNS', 'REQUEST_PATTERN_EXPANDED', 'REQUEST_SECTION_EXPANDED'
);

// export const addPattern = createAction(
//   'ADD_PATTERN',
//   title => ({
//     title,
//     patternId: generateId(),
//   })
// );

export const combinedFetchAction = ({
  requestAction, receiveAction, body,
  path, host, requestType
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
    dispatch(requestAction());
    return fetch(`${host}/${path}`, fetchObj).then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(
        json => dispatch(receiveAction(json))
      );
  }
};

export const receivePatternData = createAction(
  'RECEIVE_PATTERN_DATA',
  json => ({
    ...json,
    receivedAt: Date.now()
  })
);

export const receivePattern = createAction(
  'RECEIVE_PATTERN',
  json => ({
    ...json,
    receivedAt: Date.now()
  })
);

export const receivePatterns = createAction(
  'RECEIVE_PATTERNS',
  json => ({
    ...json,
    receivedAt: Date.now()
  })
);

export const receivePatternExpanded = createAction(
  'RECEIVE_PATTERN_EXPANDED',
  json => ({
    ...json,
    receivedAt: Date.now()
  })
);

export const receiveSectionExpanded = createAction(
  'RECEIVE_SECTION_EXPANDED',
  json => ({
    ...json,
    receivedAt: Date.now()
  })
);
