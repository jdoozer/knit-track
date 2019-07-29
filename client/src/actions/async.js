import generateId from 'uuid/v4';
import { createAction } from 'redux-actions';
import fetchActionCreator from 'utils/fetchActionCreator';

// TODO: get rid of this here (don't want in 2 places - should be in reducer)
const initialPattern = ({
  patternId,
  title = '<title placeholder>',
  info = '<pattern info placeholder>'
}) => ({
  patternId,
  title,
  info,
  sectionIds: [],
});

// SETUP ACTIONS
const requestPatternData = createAction(
  'REQUEST_PATTERN_DATA',
  dataTypes => ({ dataTypes })
  // (dataTypes, id) => ({ dataTypes, id })
);

const receivePatternData = createAction(
  'RECEIVE_PATTERN_DATA',
  json => ({ ...json })
);

const patternsError = dataTypes => createAction(
  'PATTERNS_ERROR',
  error => ({ error, dataTypes })
);

// MAIN FUNCTION
const fetchPatternData = ({ path, dataTypes=[], errorAction, requestType='GET', body=null, id=null }) =>
  fetchActionCreator({
    requestAction: requestPatternData(dataTypes, id),
    receiveAction: receivePatternData,
    errorAction,
    path,
    requestType,
    body,
  });

// POST REQUESTS
export const createPattern = ({ ...patternData }) => fetchPatternData({
  requestType: 'POST',
  body: { pattern: initialPattern({ patternId: generateId(), ...patternData }) },
  path: 'patterns',
  dataTypes: ['patterns']
});

// GET REQUESTS
export const fetchPatterns = () => fetchPatternData({
  path: 'patterns',
  dataTypes: ['patterns'],
  errorAction: patternsError(['patterns']),
});

export const fetchPatternExpanded = patternId => fetchPatternData({
  path: `patterns/${patternId}`,
  dataTypes: ['patterns', 'sections', 'rows'],
  // id: patternId,
});

const fetchSectionExpanded = sectionId => fetchPatternData({
  path: `sections/${sectionId}`,
  dataTypes: ['sections', 'rows']
});




// CONDITIONAL GET REQUESTS

export const fetchPatternExpandedIfNeeded = patternId => (dispatch, getState) => {

  if (!patternId) return Promise.resolve();

  const { patterns, sections } = getState();

  const patternLoaded = (
    !patterns.loading && patterns.allIds.includes(patternId)
  );

  let sectionsLoaded = false;

  if (patternLoaded) {
    const sectionsInPattern = patterns.byId[patternId].sectionIds;
    sectionsLoaded = (
      !sections.loading
      && sectionsInPattern.length
      && sectionsInPattern.reduce(
          (idsIncluded, id) => idsIncluded && sections.allIds.includes(id), true
        )
    );
  }

  return sectionsLoaded ? Promise.resolve() : dispatch(fetchPatternExpanded(patternId));

}

export const fetchSectionExpandedIfNeeded = sectionId => (dispatch, getState) => {

  if (!sectionId) return Promise.resolve();

  const { sections } = getState();

  const sectionLoaded = (
    !sections.loading && sections.allIds.includes(sectionId)
  );

  return sectionLoaded ? Promise.resolve() : dispatch(fetchSectionExpanded(sectionId));

}