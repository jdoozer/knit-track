import { createAction } from 'redux-actions';
import fetchThunk from 'utils/fetchThunk';


// ACTION CONSTANTS
const REQUEST_DATA = 'REQUEST_DATA';
const RECEIVE_ERROR = 'RECEIVE_ERROR';
const RECEIVE_DATA = 'RECEIVE_DATA';
const RECEIVE_NEW_SECTION = 'RECEIVE_NEW_SECTION';
const RECEIVE_UPDATED_SECTION = 'RECEIVE_UPDATED_SECTION';
const UPDATE_ROW_COUNT_OPTIMISTIC = 'UPDATE_ROW_COUNT_OPTIMISTIC';


// ACTIONS (SYNCHRONOUS)
const requestData = createAction(
  REQUEST_DATA,
  dataTypes => ({ dataTypes })
);

const receiveError = (dataTypes, id) => createAction(
  RECEIVE_ERROR,
  error => ({ error, dataTypes, id })
);

const receiveData = createAction(
  RECEIVE_DATA,
  json => ({ ...json })
);

const receiveNewSection = createAction(
  RECEIVE_NEW_SECTION,
  json => ({ section: json })
);

const receiveUpdatedSection = createAction(
  RECEIVE_UPDATED_SECTION,
  json => ({ section: json })
);

const updateRowCountOptimistic = createAction(
  UPDATE_ROW_COUNT_OPTIMISTIC,
  (sectionId, updateType) => ({ sectionId, updateType })
);


// ASYNC THUNK FUNCTIONS

export const fetchPatterns = () => fetchThunk({
  requestAction: requestData(['patterns']),
  receiveAction: receiveData,
  errorAction: receiveError(['patterns']),
  path: 'patterns',
});

const fetchPatternExpanded = patternId => fetchThunk({
  requestAction: requestData(['patterns', 'sections']),
  receiveAction: receiveData,
  errorAction: receiveError(['patterns', 'sections']),
  path: `patterns/${patternId}`,
});

export const createPattern = ({ ...patternData }) => fetchThunk({
  requestAction: requestData(['patterns']),
  receiveAction: receiveData,
  errorAction: receiveError(['patterns']),
  path: 'patterns',
  requestType: 'POST',
  body: { pattern: patternData },
});

export const createSection = ({ ...sectionData }) => fetchThunk({
  requestAction: requestData(['sections']),
  receiveAction: receiveNewSection,
  errorAction: receiveError(['sections']),
  path: 'sections',
  requestType: 'POST',
  body: { section: sectionData },
});

const updateSection = (sectionId, sectionUpdates) => fetchThunk({
  requestAction: requestData(['sections']),
  receiveAction: receiveUpdatedSection,
  errorAction: receiveError(['sections'], sectionId),
  path: `sections/${sectionId}`,
  requestType: 'PATCH',
  body: sectionUpdates,
});


// CONDITIONAL THUNK FUNCTIONS

export const fetchPatternExpandedIfNeeded = patternId => (dispatch, getState) => {

  const { patterns, sections } = getState();

  if (patterns.loading || sections.loading) return null;

  if (patterns.allIds.includes(patternId)) {

    const patternSections = patterns.byId[patternId].sectionIds;

    if (patternSections.every(id => sections.allIds.includes(id))) {
      return null;
    }
  }

  return dispatch(fetchPatternExpanded(patternId));

};


export const updateRowCount = (sectionId, updateType) => (dispatch, getState) => {

  const sectionsBeforeUpdate = getState().sections;
  const rowBeforeUpdate = sectionsBeforeUpdate.byId[sectionId].currentRow;

  dispatch(updateRowCountOptimistic(sectionId, updateType));

  const sectionsAfterUpdate = getState().sections;
  const rowAfterUpdate = sectionsAfterUpdate.byId[sectionId].currentRow;

  if (rowBeforeUpdate === rowAfterUpdate) {
    return null;
  }

  return dispatch(updateSection(sectionId, { currentRow: rowAfterUpdate }));

};
