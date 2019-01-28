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
