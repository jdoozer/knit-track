import { createAction, createActions } from 'redux-actions';

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
