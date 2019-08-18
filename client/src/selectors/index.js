import { createSelector } from 'reselect';

// patterns
const getPatternsById = state => state.patterns.byId;
export const getPatternsLoading = state => state.patterns.loading;
const getPatternsError = state => state.patterns.error;
export const getPatterns = createSelector(
  [getPatternsById],
  patternsById => Object.keys(patternsById).map(key => patternsById[key])
);

export const getPatternsErrorMsg = createSelector(
  [getPatternsError],
  error => (error && error.message) ? error.message : ''
);

export const getPatternsErrorCode = createSelector(
  [getPatternsError],
  error => (error && error.status) ? error.status : null
);

export const getPatternById = (state, patternId) => {
  const pattern = getPatternsById(state)[patternId];
  return (pattern) ? pattern : null;
};

// sections
const getAllSectionsById = state => state.sections.byId;
export const getSectionsLoading = state => state.patterns.loading;
export const getSectionsError = state => state.patterns.error;

const getSectionById = (state, sectionId) => getAllSectionsById(state)[sectionId];

export const getSectionLoading = createSelector(
  [getSectionById],
  section => section.loading
);

const getSectionError = createSelector(
  [getSectionById],
  section => section.error
);

export const getSectionErrorMsg = createSelector(
  [getSectionError],
  error => (error && error.message) ? error.message : ''
);

export const getCurrentRow = createSelector(
  [getSectionById],
  section => section.currentRow
);

export const getRowsFromSection = createSelector(
  [getSectionById],
  section => section.rows
);

export const getSectionsById = createSelector(
  [getAllSectionsById],
  (allSections) => ((sectionIds) => {
    const sections = sectionIds.map(sectionId => allSections[sectionId]);
    return sections.filter(section => section);
  })
);
