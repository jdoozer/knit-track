const mergeNormalized = (state, newItems, updateFields={}) => ({
  ...state,
  byId: {
    ...state.byId,
    ...newItems.byId,
  },
  allIds: [...new Set([...state.allIds ,...newItems.allIds])],
  ...updateFields,
});

export default mergeNormalized;
