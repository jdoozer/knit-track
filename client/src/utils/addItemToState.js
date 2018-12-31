const addItemToState = (state, itemId, item, updateFields={}) => {

  if (state.allIds.includes(itemId)) {
    return {
      ...state,
      ...updateFields
    }
  }

  return {
    ...state,
    byId: {
      ...state.byId,
      [itemId]: item,
    },
    allIds: state.allIds.concat(itemId),
    ...updateFields,
  }
};

export default addItemToState;
