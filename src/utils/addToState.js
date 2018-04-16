const addToState = (state, itemId, item) => ({
  byId: {
    ...state.byId,
    [itemId]: item,
  },
  allIds: state.allIds.concat(itemId),
});

export default addToState;
