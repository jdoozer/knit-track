import generateId from 'uuid/v4';
import { createAction, createActions } from 'redux-actions';

export const addSection = createAction(
  'ADD_SECTION',
  section => ({
    section,
    sectionId: generateId(),
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
