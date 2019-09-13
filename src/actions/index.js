import { createActions } from 'redux-actions';
import fetchThunk from 'actions/fetchThunk';

const {
  requestData,
  receiveData,
  receiveNewPattern,
  receiveNewSection,
  receiveUpdatedSection,
  updateRowCountOptimistic,
  receiveError,
  receiveDeletePatternKeys,
  receiveDeleteSectionKeys,
  clearError,
  clearLastCreated,
} = createActions({

  REQUEST_DATA: (dataTypes, id, actionType) => ({ dataTypes, id, actionType }),

  RECEIVE_DATA: json => ({ ...json }),

  RECEIVE_NEW_PATTERN: json => ({ pattern: json }),

  RECEIVE_NEW_SECTION: json => ({ section: json }),

  RECEIVE_UPDATED_SECTION: (json, sectionId) => (
    { section: { sectionId, ...json } }),

  UPDATE_ROW_COUNT_OPTIMISTIC: (sectionId, updateType) => (
    { sectionId, updateType }
  ),

  RECEIVE_ERROR: (error, dataTypes, id) => ({ error, dataTypes, id }),

  RECEIVE_DELETE_PATTERN_KEYS: ({ patternId, sectionIds }) => (
    { patternId, sectionIds }
  ),

  RECEIVE_DELETE_SECTION_KEYS: ({ patternId, sectionId }) => (
    { patternId, sectionId }
  ),

  CLEAR_ERROR: (dataTypes, id) => ({ dataTypes, id }),

  CLEAR_LAST_CREATED: dataTypes => ({ dataTypes }),

});

// EXPORT SYNCHRONOUS ACTION CREATORS
export { clearError, clearLastCreated };


// ASYNC THUNK FUNCTIONS

export const fetchPatterns = () => fetchThunk({
  requestAction: requestData(['patterns']),
  receiveAction: receiveData,
  errorAction: error => receiveError(error, ['patterns']),
  path: 'patterns',
});

// data types here only patterns even though we're fetching sections too; all
// done with a single fetch request and patterns is the primary update
const fetchPatternExpanded = patternId => fetchThunk({
  requestAction: requestData(['patterns'], patternId),
  receiveAction: receiveData,
  errorAction: error => receiveError(error, ['patterns'], patternId),
  path: `patterns/${patternId}`,
});

export const createPattern = ({ ...patternData }) => fetchThunk({
  requestAction: requestData(['patterns']),
  receiveAction: receiveNewPattern,
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

const updateSection = (sectionId, sectionUpdates, actionType) => fetchThunk({
  requestAction: requestData(['sections'], sectionId, actionType),
  receiveAction: json => receiveUpdatedSection(json, sectionId),
  errorAction: error => receiveError(error, ['sections'], sectionId),
  path: `sections/${sectionId}`,
  requestType: 'PATCH',
  body: sectionUpdates,
});

export const deletePattern = patternId => fetchThunk({
  requestAction: requestData(['patterns'], patternId, 'deletePattern'),
  receiveAction: receiveDeletePatternKeys,
  errorAction: error => receiveError(error, ['patterns'], patternId),
  path: `patterns/${patternId}`,
  requestType: 'DELETE',
});

export const deleteSection = sectionId => fetchThunk({
  requestAction: requestData(['sections'], sectionId, 'deleteSection'),
  receiveAction: receiveDeleteSectionKeys,
  errorAction: error => receiveError(error, ['sections'], sectionId),
  path: `sections/${sectionId}`,
  requestType: 'DELETE',
});


// CONDITIONAL & CHAINED THUNKS

export const fetchPatternExpandedIfNeeded = patternId => (
  (dispatch, getState) => {

    const { patterns, sections } = getState();

    if (patterns.loading || sections.loading) return null;

    if (patterns.allIds.includes(patternId)) {

      const patternSections = patterns.byId[patternId].sectionIds;

      if (patternSections && patternSections.every(
        id => sections.allIds.includes(id)
      )) {
        return null;
      }
    }

    return dispatch(fetchPatternExpanded(patternId));
  }
);


export const updateRowCount = (sectionId, updateType) => (
  (dispatch, getState) => {

    const sectionsBeforeUpdate = getState().sections;
    const rowBeforeUpdate = sectionsBeforeUpdate.byId[sectionId].currentRow;

    dispatch(updateRowCountOptimistic(sectionId, updateType));

    const sectionsAfterUpdate = getState().sections;
    const rowAfterUpdate = sectionsAfterUpdate.byId[sectionId].currentRow;

    if (rowBeforeUpdate === rowAfterUpdate) {
      return null;
    }

    return dispatch(
      updateSection(sectionId, { currentRow: rowAfterUpdate }, 'updateRowCount')
    );
  }
);
