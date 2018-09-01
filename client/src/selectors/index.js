import { createSelector } from 'reselect';

const getPatternsById = state => state.patterns.byId;
const getSectionsById = state => state.sections.byId;
const getRowsById = state => state.rows.byId;
const getSelectedPatternId = state => state.ui.selectedPattern;
export const getSectionIdToEdit = state => state.ui.sectionToEdit;

const getRowIdsFromSection = (state, sectionId) => (
  getSectionsById(state)[sectionId].rowIds
);

export const getCurrentRow = (state, sectionId) => (
  getSectionsById(state)[sectionId].currentRow
);

export const getNumRowsSection = createSelector(
  [getSectionIdToEdit, getSectionsById],
  (sectionId, sections) => sectionId ? sections[sectionId].numRows : 0
);

export const getPatterns = createSelector(
  [getPatternsById],
  patternsById => Object.keys(patternsById).map(key => patternsById[key])
);

export const getSelectedPattern = createSelector(
  [getPatternsById, getSelectedPatternId],
  (patterns, selectedPatternId) => {
    if (selectedPatternId === null) {
      return null;
    }
    return patterns[selectedPatternId];
  }
);

export const getSelectedPatternSections = createSelector(
  [getSelectedPattern, getSectionsById],
  (selectedPattern, sections) => {

    if (selectedPattern === null) return null;

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
