import { update, mergeItems } from 'utils/reducerUtils';

export const collectionMetaState = {
  loading: false,
  error: null,
  lastCreatedId: '',
  lastActionType: ''
};

export const initialState = {
  byId: {},
  allIds: [],
  ...collectionMetaState
};

export const itemMetaState = {
  loading: false,
  error: null,
  lastActionType: ''
};

const sharedReducer = stateDataType => (state = initialState, action) => {

  const { payload } = action;

  if (!payload || (payload.dataType && (payload.dataType !== stateDataType)))
    return state;

  if (action.type === 'RECEIVE_DATA')
    return mergeItems(
      state, payload[stateDataType], collectionMetaState, itemMetaState
    );


  let updates;

  switch (action.type) {
    case 'REQUEST_DATA':
      updates = {
        loading: true,
        lastActionType: payload.actionType ? payload.actionType : '',
        error: null
      };
      break;

    case 'RECEIVE_ERROR':
      updates = { loading: false, error: payload.error };
      break;

    case 'CLEAR_ERROR':
      updates = { error: null, lastActionType: '' };
      break;

    case 'CLEAR_LAST_CREATED':
      updates = { lastCreatedId: '' };
      break;

    default:
      updates = {};
  }

  const id = payload.id ? payload.id : '';
  return update(state, updates, id);

};

export default sharedReducer;
