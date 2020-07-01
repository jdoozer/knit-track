import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import patternsReducer from 'reducers/patterns';
import sectionsReducer from 'reducers/sections';
import sharedReducers from 'reducers/shared';
import usersReducer from 'reducers/users';
import * as patternSelectors from 'reducers/patterns';
import * as sectionSelectors from 'reducers/sections';
import * as userSelectors from 'reducers/users';

const createRootReducer = loginState => combineReducers({
  patterns: reduceReducers(patternsReducer, sharedReducers('patterns')),
  sections: reduceReducers(sectionsReducer, sharedReducers('sections')),
  users: usersReducer(loginState),
});

export default createRootReducer;


// SELECTORS [patterns]
export const getPatternsLoading = state => (
  patternSelectors.getPatternsLoading(state.patterns)
);

export const getPatternsError = state => (
  patternSelectors.getPatternsError(state.patterns)
);

export const getPatternsLastAction = state => (
  patternSelectors.getPatternsLastAction(state.patterns)
);

export const getPatternTitlesSorted = state => (
  patternSelectors.getPatternTitlesSorted(state.patterns)
);

export const getPatternById = (state, patternId) => (
  patternSelectors.getPatternById(state.patterns, patternId)
);

export const getPatternLoading = (state, patternId) => (
  patternSelectors.getPatternLoading(state.patterns, patternId)
);

export const getPatternError = (state, patternId) => (
  patternSelectors.getPatternError(state.patterns, patternId)
);

export const getPatternLastAction = (state, patternId) => (
  patternSelectors.getPatternLastAction(state.patterns, patternId)
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

export const getSectionById = (state, sectionId) => (
  sectionSelectors.getSectionById(state.sections, sectionId)
);

export const getSectionLoading = (state, sectionId) => (
  sectionSelectors.getSectionLoading(state.sections, sectionId)
);

export const getSectionError = (state, sectionId) => (
  sectionSelectors.getSectionError(state.sections, sectionId)
);

export const getSectionLastAction = (state, sectionId) => (
  sectionSelectors.getSectionLastAction(state.sections, sectionId)
);

// SELECTORS [users]
export const getUserLoggedIn = state => (
  userSelectors.getUserLoggedIn(state.users)
);
