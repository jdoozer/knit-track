import { createAction } from 'redux-actions';
import fetchActionCreator from 'utils/fetchActionCreator';

// ACTION CONSTANTS
const REQUEST_DATA = 'REQUEST_DATA';
const RECEIVE_DATA = 'RECEIVE_DATA';
const RECEIVE_ERROR = 'RECEIVE_ERROR';


// SETUP ACTIONS
const requestData = createAction(
  REQUEST_DATA,
  dataTypes => ({ dataTypes })
);

const receiveData = createAction(
  RECEIVE_DATA,
  json => ({ ...json })
);

const receiveError = dataTypes => createAction(
  RECEIVE_ERROR,
  error => ({ error, dataTypes })
);

// MAIN FUNCTION
const fetchPatternData = ({ path, dataTypes=[], errorAction, requestType='GET', body=null, id=null }) =>
  fetchActionCreator({
    requestAction: requestData(dataTypes, id),
    receiveAction: receiveData,
    errorAction,
    path,
    requestType,
    body,
  });

// POST REQUESTS
export const createPattern = ({ ...patternData }) => fetchPatternData({
  requestType: 'POST',
  body: { pattern: patternData },
  path: 'patterns',
  dataTypes: ['patterns'],
  errorAction: receiveError(['patterns']),
});

// GET REQUESTS
export const fetchPatterns = () => fetchPatternData({
  path: 'patterns',
  dataTypes: ['patterns'],
  errorAction: receiveError(['patterns']),
});

export const fetchPatternExpanded = patternId => fetchPatternData({
  path: `patterns/${patternId}`,
  dataTypes: ['patterns', 'sections'],
  errorAction: receiveError(['patterns', 'sections']),
});

// CONDITIONAL GET REQUESTS

export const fetchPatternExpandedIfNeeded = patternId => (dispatch, getState) => {

  const { patterns, sections } = getState();

  if (patterns.loading) return null;

  if (patterns.allIds.includes(patternId)) {

    const patternSections = patterns.byId[patternId].sectionIds;

    const patternSectionsInState = (
      patternSections.every(id => sections.allIds.includes(id))
    );

    if (sections.loading || patternSectionsInState) {
      return null;
    }
  }

  return dispatch(fetchPatternExpanded(patternId));

}
