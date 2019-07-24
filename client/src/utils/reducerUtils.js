import mergeNormalized from 'utils/mergeNormalized';

export const mergeStateData = (state, newItems, receivedAt) => {
  if (newItems) {
    return mergeNormalized(
      state,
      newItems,
      { loading: false, lastUpdated: receivedAt }
    );
  }
  return state;
}

export const setLoading = dataType => (state, action) => {
  if (action.payload.dataTypes.includes(dataType)) {
    return { ...state, loading: true }
  }
  return state;
};

export const setError = dataType => (state, action) => {
  if (action.payload.dataTypes.includes(dataType)) {
    return { ...state, error: action.payload.error, loading: false }
  }
  return state;
};
