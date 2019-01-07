import generateId from 'uuid/v4';
import fetch from 'cross-fetch';
import { requestPatternExpanded, receivePattern } from './asyncSetup';

const MOCK_SERVER_URL = 'api/';

const initialPattern = ({ patternId, title }) => ({
  title,
  patternId,
  sectionIds: [],
  info: '<pattern info placeholder>',
});


// BASIC ACTION CREATOR
const fetchPost = (request, receive, body, path, host=MOCK_SERVER_URL) => (
  dispatch => {
    dispatch(request());
    return fetch(`${host}/${path}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(
        json => dispatch(receive(json))
      );
  }
);

export const createPattern = title => fetchPost(
  requestPatternExpanded,
  receivePattern,
  { pattern: initialPattern({ patternId: generateId(), title }) },
  'patterns'
);



// // ACTION CREATORS FOR FETCHING
// const fetchPatterns = () => fetchGet(
//   requestPatterns,
//   receivePatterns,
//   'patterns'
// );
//
// const fetchPatternExpanded = patternId => fetchGet(
//   requestPatternExpanded,
//   receivePatternExpanded,
//   `patterns/${patternId}`
// );
//
// const fetchSectionExpanded = sectionId => fetchGet(
//   requestSectionExpanded,
//   receiveSectionExpanded,
//   `sections/${sectionId}`
// );
