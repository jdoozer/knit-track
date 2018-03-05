import deleteItems from 'utils/deleteItems';
import deleteKeys from 'utils/deleteKeys';

const deleteFromState = (state, itemIds) => ({
  byId: deleteKeys(state.byId, itemIds),
  allIds: deleteItems(state.allIds, itemIds),
});

export default deleteFromState;
