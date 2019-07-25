const mergeStateData = (state, newItems) => {

  if (newItems) {

    const updateFields = { loading: false, error: null };

    let newState = {
      ...state,
      byId: {
        ...state.byId,
      },
      allIds: [...new Set([...state.allIds ,...newItems.allIds])],
      ...updateFields,
    };

    newItems.allIds.forEach(id => newState.byId[id] = {
      ...newItems.byId[id],
      // ...updateFields,
    });

    return newState;
  }

  return state;

};

export default mergeStateData;
