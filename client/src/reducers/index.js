import { combineReducers } from 'redux';
import patterns from 'reducers/patterns';
import sections from 'reducers/sections';
import * as patternSelectors from 'reducers/patterns';
import * as sectionSelectors from 'reducers/sections';

const createRootReducer = combineReducers({
  patterns,
  sections,
});

export default createRootReducer;


// SELECTORS [patterns]
export const getPatternsLoading = state => (
  patternSelectors.getPatternsLoading(state.patterns)
);

export const getPatternsError = state => (
  patternSelectors.getPatternsError(state.patterns)
);

export const getPatternsErrorCode = state => (
  patternSelectors.getPatternsErrorCode(state.patterns)
);

export const getPatternTitlesSorted = state => (
  patternSelectors.getPatternTitlesSorted(state.patterns)
);

export const getPatternById = (state, patternId) => (
  patternSelectors.getPatternById(state.patterns, patternId)
);

export const getLastCreatedPatternId = state => (
  patternSelectors.getLastCreatedPatternId(state.patterns)
);

// SELECTORS [sections]
export const getSectionsLoading = state => (
  sectionSelectors.getSectionsLoading(state.sections)
);

export const getSectionsError = state => (
  sectionSelectors.getSectionsError(state.sections)
);

export const getSectionsById = (state, sectionIds) => (
  sectionSelectors.getSectionsById(state.sections, sectionIds)
);

export const getPatternIdLastCreatedSection = state => (
  sectionSelectors.getPatternIdLastCreatedSection(state.sections)
);
