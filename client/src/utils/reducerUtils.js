
export const setLoading = (dataType) => (state, action) => {
  if (action.payload.dataTypes.includes(dataType)) {
  //   if (action.payload.id) {
  //     return {
  //       ...state,
  //       [action.payload.id]: {
  //         ...state[action.payload.id],
  //         loading: true,
  //       },
  //     }
  //   }
    return { ...state, loading: true }
  }
  return state
}

export const setError = (dataType, id) => (state, action) => {
  if (action.payload.dataTypes.includes(dataType)) {
    return { ...state, error: action.payload.error, loading: false }
  }
  return state;
};
