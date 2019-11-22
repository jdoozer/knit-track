import { createActions } from 'redux-actions';
import fetchThunk from 'actions/fetchThunk';
import db from 'config/firebaseDB';

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
  updateLogin
} = createActions({

  REQUEST_DATA: (dataType, id, actionType) => ({ dataType, id, actionType }),

  RECEIVE_DATA: json => ({ ...json }),

  RECEIVE_NEW_PATTERN: json => ({ pattern: json }),

  RECEIVE_NEW_SECTION: json => ({ section: json }),

  RECEIVE_UPDATED_SECTION: (json, sectionId) => (
    { section: { sectionId, ...json } }),

  UPDATE_ROW_COUNT_OPTIMISTIC: (sectionId, updateType) => (
    { sectionId, updateType }
  ),

  RECEIVE_ERROR: (error, dataType, id) => ({ error, dataType, id }),

  RECEIVE_DELETE_PATTERN_KEYS: ({ patternId, sectionIds }) => (
    { patternId, sectionIds }
  ),

  RECEIVE_DELETE_SECTION_KEYS: ({ patternId, sectionId }) => (
    { patternId, sectionId }
  ),

  CLEAR_ERROR: (dataType, id) => ({ dataType, id }),

  CLEAR_LAST_CREATED: dataType => ({ dataType }),

  UPDATE_LOGIN: loggedIn => ({ loggedIn })

});

// EXPORT SYNCHRONOUS ACTION CREATORS
export { clearError, clearLastCreated, updateLogin };


// FORMATTING FOR REALTIME DB REQUESTS (replicated from express server)
const formatPatterns = (patterns) => ({
  patterns: { byId: patterns, allIds: Object.keys(patterns) }
});

// ASYNC THUNK FUNCTIONS - REALTIME DATABASE
export const subscribePatternList = (listenerOn) => (dispatch) => {
  if (listenerOn) {
    dispatch(requestData('patterns'));
    db.ref('patterns').on('value',
      snapshot => {
        let patterns = {};
        snapshot.forEach(patternSnapshot => {
          patterns[patternSnapshot.key] = {
            patternId: patternSnapshot.key,
            title: patternSnapshot.child('title').val()
          }
        });
        return dispatch(receiveData(formatPatterns(patterns)));
      },
      error => dispatch(
        receiveError({ status: 500, message: error.message }, 'patterns')
      )
    );
  } else {
    db.ref('patterns').off('value');
  }
};

export const subscribeRowCount = (sectionId, listenerOn) => (
  (dispatch, getState) => {
    if (listenerOn) {
      db.ref(`sections/${sectionId}/currentRow`).on('value',
        currRowSnap => {
          const { lastActionType } = getState().sections.byId[sectionId];
          if (lastActionType === 'updateRowCount')
            return null;
          return dispatch(
            receiveUpdatedSection({ currentRow: currRowSnap.val() }, sectionId)
          )
        },
        error => dispatch(
          receiveError(
            { status: 500, message: error.message }, 'sections', sectionId
          )
        )
      );
    } else {
      db.ref(`sections/${sectionId}/currentRow`).off('value');
    }
  }
);


// ASYNC THUNK FUNCTIONS - REST API
export const fetchPatterns = () => fetchThunk({
  requestAction: requestData('patterns'),
  receiveAction: receiveData,
  errorAction: error => receiveError(error, 'patterns'),
  path: 'patterns',
});

const fetchPatternExpanded = patternId => fetchThunk({
  requestAction: requestData('patterns', patternId),
  receiveAction: receiveData,
  errorAction: error => receiveError(error, 'patterns', patternId),
  path: `patterns/${patternId}`,
});

export const createPattern = ({ ...patternData }) => fetchThunk({
  requestAction: requestData('patterns'),
  receiveAction: receiveNewPattern,
  errorAction: error => receiveError(error, 'patterns'),
  path: 'patterns',
  requestType: 'POST',
  body: { pattern: patternData },
});

export const createSection = ({ ...sectionData }) => fetchThunk({
  requestAction: requestData('sections'),
  receiveAction: receiveNewSection,
  errorAction: error => receiveError(error, 'sections'),
  path: 'sections',
  requestType: 'POST',
  body: { section: sectionData },
});

const updateSection = (sectionId, sectionUpdates, actionType) => fetchThunk({
  requestAction: requestData('sections', sectionId, actionType),
  receiveAction: json => receiveUpdatedSection(json, sectionId),
  errorAction: error => receiveError(error, 'sections', sectionId),
  path: `sections/${sectionId}`,
  requestType: 'PATCH',
  body: sectionUpdates,
});

export const deletePattern = patternId => fetchThunk({
  requestAction: requestData('patterns', patternId, 'deletePattern'),
  receiveAction: receiveDeletePatternKeys,
  errorAction: error => receiveError(error, 'patterns', patternId),
  path: `patterns/${patternId}`,
  requestType: 'DELETE',
});

export const deleteSection = sectionId => fetchThunk({
  requestAction: requestData('sections', sectionId, 'deleteSection'),
  receiveAction: receiveDeleteSectionKeys,
  errorAction: error => receiveError(error, 'sections', sectionId),
  path: `sections/${sectionId}`,
  requestType: 'DELETE',
});


// CONDITIONAL & CHAINED THUNKS

export const fetchPatternExpandedIfNeeded = patternId => (
  (dispatch, getState) => {

    const { patterns, sections } = getState();

    if (patterns.allIds.includes(patternId)) {

      const patternSectionIds = patterns.byId[patternId].sectionIds;

      if (patternSectionIds && patternSectionIds.every(
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

    if (rowBeforeUpdate === rowAfterUpdate)
      return null;

    return dispatch(
      updateSection(sectionId, { currentRow: rowAfterUpdate }, 'updateRowCount')
    );
  }
);
