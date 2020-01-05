import { createActions } from 'redux-actions';
import fetchThunk from 'actions/fetchThunk';
import db from 'config/firebaseDB';
import isEmpty from 'utils/isEmpty';

const {
  requestData,
  receiveData,
  receivePatternTitles,
  receiveNewPattern,
  receiveNewSection,
  receiveUpdatedSection,
  receiveUpdatedPattern,
  updateRowCountOptimistic,
  receiveError,
  receiveDeletePatternKeys,
  receiveDeleteSectionKeys,
  clearError,
  updateLogin
} = createActions({

  REQUEST_DATA: (dataType, id, actionType) => ({ dataType, id, actionType }),

  RECEIVE_DATA: json => ({ ...json }),

  RECEIVE_PATTERN_TITLES: json => ({ ...json }),

  RECEIVE_NEW_PATTERN: json => ({ pattern: json }),

  RECEIVE_NEW_SECTION: json => ({ section: json }),

  RECEIVE_UPDATED_SECTION: (json, sectionId) => (
    { section: { sectionId, ...json } }),

  RECEIVE_UPDATED_PATTERN: (json, patternId) => (
    { pattern: { patternId, ...json } }),

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

  UPDATE_LOGIN: loggedIn => ({ loggedIn })

});

// EXPORT SYNCHRONOUS ACTION CREATORS
export { clearError, updateLogin };


// ASYNC THUNK FUNCTIONS - REALTIME DATABASE
export const subscribePatternList = (listenerOn) => (dispatch) => {
  if (listenerOn) {
    dispatch(requestData('patterns'));
    db.ref('patterns').on('value',
      patternSnapshots => {
        let patterns = { byId: {}, allIds: [] };
        patternSnapshots.forEach(snapshot => {
          const patternId = snapshot.key;
          patterns.byId[patternId] = {
            patternId: patternId,
            title: snapshot.child('title').val()
          };
          patterns.allIds.push(patternId);
        });
        return dispatch(receivePatternTitles({ patterns }));
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
          const currentRowUpdated = currRowSnap.val();
          const { lastActionType, currentRow } = (
            getState().sections.byId[sectionId]
          );
          if (
            (lastActionType === 'updateRowCount')
            || (currentRow === currentRowUpdated)
          )
            return null;
          return dispatch(
            receiveUpdatedSection({ currentRow: currentRowUpdated }, sectionId)
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

export const updatePattern = (patternId, patternUpdates, actionType) => {
  if (isEmpty(patternUpdates))
    return (dispatch => Promise.resolve());
  return fetchThunk({
    requestAction: requestData('patterns', patternId, actionType),
    receiveAction: json => receiveUpdatedPattern(json, patternId),
    errorAction: error => receiveError(error, 'patterns', patternId),
    path: `patterns/${patternId}`,
    requestType: 'PATCH',
    body: patternUpdates,
  })
};

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

export const fetchPatternIfNeeded = (patternId) => (
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
