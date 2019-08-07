import { createAction } from 'redux-actions';
import fetchActionCreator from 'utils/fetchActionCreator';


// ACTION CONSTANTS
const REQUEST_DATA = 'REQUEST_DATA';
const RECEIVE_ERROR = 'RECEIVE_ERROR';
const RECEIVE_DATA = 'RECEIVE_DATA';
const RECEIVE_NEW_SECTION = 'RECEIVE_NEW_SECTION';


// SUPPORTING ACTIONS
const requestData = createAction(
  REQUEST_DATA,
  dataTypes => ({ dataTypes })
);

const receiveError = dataTypes => createAction(
  RECEIVE_ERROR,
  error => ({ error, dataTypes })
);

const receiveData = createAction(
  RECEIVE_DATA,
  json => ({ ...json })
);

const receiveNewSection = createAction(
  RECEIVE_NEW_SECTION,
  json => ({ section: json })
);


// POST REQUESTS
export const createPattern = ({ ...patternData }) => fetchActionCreator({
  requestAction: requestData(['patterns']),
  receiveAction: receiveData,
  errorAction: receiveError(['patterns']),
  path: 'patterns',
  requestType: 'POST',
  body: { pattern: patternData },
});

export const createSection = ({ ...sectionData }) => fetchActionCreator({
  requestAction: requestData(['sections']),
  receiveAction: receiveNewSection,
  errorAction: receiveError(['sections']),
  path: 'sections',
  requestType: 'POST',
  body: { section: sectionData },
});


// GET REQUESTS
export const fetchPatterns = () => fetchActionCreator({
  requestAction: requestData(['patterns']),
  receiveAction: receiveData,
  errorAction: receiveError(['patterns']),
  path: 'patterns',
});

export const fetchPatternExpanded = patternId => fetchActionCreator({
  requestAction: requestData(['patterns', 'sections']),
  receiveAction: receiveData,
  errorAction: receiveError(['patterns', 'sections']),
  path: `patterns/${patternId}`,
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
