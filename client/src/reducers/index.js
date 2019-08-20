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

export const getPatternsErrorMsg = state => (
  patternSelectors.getPatternsErrorMsg(state.patterns)
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

// SELECTORS [sections]
export const getSectionLoading = (state, sectionId) => (
  sectionSelectors.getSectionLoading(state.sections, sectionId)
);

export const getSectionErrorMsg = (state, sectionId) => (
  sectionSelectors.getSectionErrorMsg(state.sections, sectionId)
);

export const getCurrentRow = (state, sectionId) => (
  sectionSelectors.getCurrentRow(state.sections, sectionId)
);

export const getRowsFromSection = (state, sectionId) => (
  sectionSelectors.getRowsFromSection(state.sections, sectionId)
);

export const getSectionsById = (state, sectionIds) => (
  sectionSelectors.getSectionsById(state.sections, sectionIds)
);
