import { createSelector } from 'reselect';

const getPatternsById = state => state.patterns.byId;
const getSectionsById = state => state.sections.byId;
const getRowsById = state => state.rows.byId;
const getPath = state => state.router.location.pathname;

export const getPatternsLoading = state => state.patterns.loading;
export const getPatternsError = state => state.patterns.error;
export const getRowLoading = state => state.rows.loading;

const getRowIdsFromSection = (state, sectionId) => (
  getSectionsById(state)[sectionId].rowIds
);

export const getCurrentRow = (state, sectionId) => (
  getSectionsById(state)[sectionId].currentRow
);

export const getPatterns = createSelector(
  [getPatternsById],
  patternsById => Object.keys(patternsById).map(key => patternsById[key])
);

export const getSelectedPatternId = createSelector(
  [getPath],
  path => {
    const pathTokens = path.split('/').filter(x => x !== '');
    const idFromPath = (pathTokens[0] === 'patterns') ? pathTokens[1] : null;
    return idFromPath;
  }
);

export const getSelectedPattern = createSelector(
  [getPatternsById, getSelectedPatternId],
  (patterns, selectedPatternId) => {
    if (!selectedPatternId || !patterns[selectedPatternId]) {
      return null;
    }
    return patterns[selectedPatternId];
  }
);

export const getSelectedPatternSections = createSelector(
  [getSelectedPattern, getSectionsById],
  (selectedPattern, sections) => {

    if (!selectedPattern || !selectedPattern.sectionIds) return [];

    const selectedPatternSections = selectedPattern.sectionIds.map(sectionId => sections[sectionId]);
    return selectedPatternSections.filter(section => section);
  }
);

export const getRowsFromSection = createSelector(
  [getRowIdsFromSection, getRowsById],
  (rowIds, rows) => {
    const rowsFromSection = rowIds.map(rowId => rows[rowId]);
    return rowsFromSection.filter(row => row);
  }
);
