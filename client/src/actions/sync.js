import { createActions } from 'redux-actions';

export const { deletePattern, deleteSection } = createActions(
  'DELETE_PATTERN', 'DELETE_SECTION'
);
