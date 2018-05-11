const addToState = (state, itemId, item) => ({
  ...state,
  byId: {
    ...state.byId,
    [itemId]: item,
  },
  allIds: state.allIds.concat(itemId),
});

export default addToState;
