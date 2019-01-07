import generateId from 'uuid/v4';
import { createAction, createActions } from 'redux-actions';

export const addPattern = createAction(
  'ADD_PATTERN',
  title => ({
    title,
    patternId: generateId(),
  })
);

export const addSection = createAction(
  'ADD_SECTION',
  (patternId, title, numRows) => ({
    title,
    numRows,
    patternId,
    sectionId: generateId(),
  })
);

export const addRow = createAction(
  'ADD_ROW',
  (sectionId, rowInfo) => ({
    sectionId,
    ...rowInfo,
    rowId: generateId(),
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

export const { selectPattern, clearSection } = createActions(
  'SELECT_PATTERN', 'CLEAR_SECTION'
);
