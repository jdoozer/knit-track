import { createSelector } from 'reselect';

const getPatternsById = state => state.patterns.byId;
const getSectionsById = state => state.sections.byId;
const getRowsById = state => state.rows.byId;
const getSelectedPatternId = state => state.ui.selectedPattern;
export const getSectionIdToEdit = state => state.ui.sectionToEdit;

const getRowIdsFromSection = (state, props) => (
  getSectionsById(state)[props.sectionId].rowIds
);

export const getCurrentRow = (state, props) => (
  getSectionsById(state)[props.sectionId].currentRow
);

export const getNumRowsSection = createSelector(
  [getSectionIdToEdit, getSectionsById],
  (sectionId, sections) => sectionId ? sections[sectionId].numRows : 0
);

export const getPatterns = createSelector(
  [getPatternsById],
  patternsById => Object.keys(patternsById).map(key => obj[patternsById])
);

export const getSelectedPattern = createSelector(
  [getPatternsById, getSelectedPatternId],
  (patterns, selectedPatternId) => {
    if (selectedPatternId == null) {
      return null;
    }
    return patterns[selectedPatternId];
  }
);

export const getSelectedPatternSections = createSelector(
  [getSelectedPattern, getSectionsById],
  (selectedPattern, sections) => {
    if (selectedPattern == null) {
      return null;
    }
    return selectedPattern.sectionIds.map(sectionId => sections[sectionId]);
  }
);

export const getRowsFromSection = createSelector(
  [getRowIdsFromSection, getRowsById],
  (rowIds, rows) => rowIds.map(rowId => rows[rowId])
);
