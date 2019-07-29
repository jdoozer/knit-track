
export const setLoading = dataType => (state, action) => {
  if (action.payload.dataTypes.includes(dataType)) {
    return { ...state, loading: true }
  }
  return state
}

export const setError = dataType => (state, action) => {
  if (action.payload.dataTypes.includes(dataType)) {
    return { ...state, error: action.payload.error, loading: false }
  }
  return state;
};

export const mergeStateData = dataType => (state, action) => {

  const newItems = action.payload[dataType];

  if (newItems) {

    const updateFields = { loading: false, error: null };

    return {
      ...state,
      byId: {
        ...state.byId,
        ...newItems.byId,
      },
      allIds: [...new Set([...state.allIds ,...newItems.allIds])],
      ...updateFields,
    };

    // newItems.allIds.forEach(id => newState.byId[id] = {
    //   ...newItems.byId[id],
    // });

  }
  return state;
};
