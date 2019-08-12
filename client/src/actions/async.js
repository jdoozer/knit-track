import { createActions } from 'redux-actions';
import fetchThunk from 'utils/fetchThunk';

const {
  requestData,
  receiveData,
  receiveNewSection,
  receiveUpdatedSection,
  updateRowCountOptimistic,
  receiveError,
} = createActions({

  REQUEST_DATA: (dataTypes, id) => ({ dataTypes, id }),

  RECEIVE_DATA: json => ({ ...json }),

  RECEIVE_NEW_SECTION: json => ({ section: json }),

  RECEIVE_UPDATED_SECTION: json => ({ section: json }),

  UPDATE_ROW_COUNT_OPTIMISTIC: (sectionId, updateType) => (
    { sectionId, updateType }
  ),

  RECEIVE_ERROR: (error, dataTypes, id) => ({ error, dataTypes, id }),

});


// ASYNC THUNK FUNCTIONS

export const fetchPatterns = () => fetchThunk({
  requestAction: requestData(['patterns']),
  receiveAction: receiveData,
  errorAction: error => receiveError(error, ['patterns']),
  path: 'patterns',
});

const fetchPatternExpanded = patternId => fetchThunk({
  requestAction: requestData(['patterns', 'sections']),
  receiveAction: receiveData,
  errorAction: error => receiveError(error, ['patterns', 'sections']),
  path: `patterns/${patternId}`,
});

export const createPattern = ({ ...patternData }) => fetchThunk({
  requestAction: requestData(['patterns']),
  receiveAction: receiveData,
  errorAction: error => receiveError(error, ['patterns']),
  path: 'patterns',
  requestType: 'POST',
  body: { pattern: patternData },
});

export const createSection = ({ ...sectionData }) => fetchThunk({
  requestAction: requestData(['sections']),
  receiveAction: receiveNewSection,
  errorAction: error => receiveError(error, ['sections']),
  path: 'sections',
  requestType: 'POST',
  body: { section: sectionData },
});

const updateSection = (sectionId, sectionUpdates) => fetchThunk({
  requestAction: requestData(['sections'], sectionId),
  receiveAction: receiveUpdatedSection,
  errorAction: error => receiveError(error, ['sections'], sectionId),
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
