import deleteItems from 'utils/deleteItems';

const deleteItemsByKeys = (obj, keys) => (
  Object.keys(obj).reduce(
    (newObj, currKey) => {
      if (keys && !keys.includes(currKey))  newObj[currKey] = obj[currKey];
      return newObj;
    },
    {}
  )
);

const deleteFromState = (state, itemIds) => ({
  ...state,
  byId: deleteItemsByKeys(state.byId, itemIds),
  allIds: deleteItems(state.allIds, itemIds),
});

export default deleteFromState;
