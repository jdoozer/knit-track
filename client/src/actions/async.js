import generateId from 'uuid/v4';
import { createAction } from 'redux-actions';
import fetchAction from 'utils/fetchAction';

// TODO: get rid of this here or in reducer (don't want in 2 places)
const initialPattern = ({ patternId, title }) => ({
  title,
  patternId,
  sectionIds: [],
  info: '<pattern info placeholder>',
});

// SETUP ACTIONS
const requestPatternData = createAction(
  'REQUEST_PATTERN_DATA',
  dataTypes => ({ dataTypes })
);

const receivePatternData = createAction(
  'RECEIVE_PATTERN_DATA',
  json => ({
    ...json,
    receivedAt: Date.now()
  })
);

// MAIN FUNCTION
const fetchPatternData = ({ path, dataTypes=[], requestType='GET', body=null }) =>
  fetchAction({
    requestAction: requestPatternData(dataTypes),
    receiveAction: receivePatternData,
    path,
    requestType,
    body,
  });

// POST REQUESTS
export const createPattern = title => fetchPatternData({
  requestType: 'POST',
  body: { pattern: initialPattern({ patternId: generateId(), title }) },
  path: 'patterns',
  dataTypes: ['patterns']
});

// GET REQUESTS
const fetchPatterns = () => fetchPatternData({
  path: 'patterns',
  dataTypes: ['patterns']
});

const fetchPatternExpanded = patternId => fetchPatternData({
  path: `patterns/${patternId}`,
  dataTypes: ['patterns', 'sections', 'rows']
});

const fetchSectionExpanded = sectionId => fetchPatternData({
  path: `sections/${sectionId}`,
  dataTypes: ['sections', 'rows']
});

// CONDITIONAL GET REQUESTS
export const fetchPatternsIfNeeded = () => (dispatch, getState) => {
  const { patterns } = getState();
  const patternsLoaded = !patterns.loading && patterns.allIds.length;
  return patternsLoaded ? Promise.resolve() : dispatch(fetchPatterns());
};

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
