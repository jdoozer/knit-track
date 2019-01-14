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

export const receivePattern = createAction(
  'RECEIVE_PATTERN',
  json => ({
    pattern: json.pattern,
    receivedAt: Date.now()
  })
);

export const receivePatterns = createAction(
  'RECEIVE_PATTERNS',
  json => ({
    patterns: json.patterns,
    receivedAt: Date.now()
  })
);

export const receivePatternExpanded = createAction(
  'RECEIVE_PATTERN_EXPANDED',
  json => ({
    pattern: json.pattern,
    sections: json.sections,
    rows: json.rows,
    receivedAt: Date.now()
  })
);

export const receiveSectionExpanded = createAction(
  'RECEIVE_SECTION_EXPANDED',
  json => ({
    section: json.section,
    rows: json.rows,
    receivedAt: Date.now()
  })
);
