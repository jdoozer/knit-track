import generateId from 'uuid/v4';
import { createAction, createActions } from 'redux-actions';

export const addSectionWithRows = createAction(
  'ADD_SECTION_WITH_ROWS',
  (sectionData, rowData) => ({
    section: sectionData,
    rows: rowData,
    sectionId: generateId(),
    rowIds: Array(rowData.length).fill(0).map(x => generateId())
  })
);

export const updateRowCount = createAction(
  'UPDATE_ROW_COUNT',
  (sectionId, updateType) => ({
    sectionId,
    updateType
  })
);

export const { deletePattern, deleteSection, deleteRow } = createActions(
  'DELETE_PATTERN', 'DELETE_SECTION', 'DELETE_ROW'
);

export const selectPattern = createAction('SELECT_PATTERN');
