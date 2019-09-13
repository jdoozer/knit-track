const updateNormalized = (state, id, updateObj={}) => {

  if (state.allIds.includes(id)) {
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: {
          ...state.byId[id],
          ...updateObj
        },
      },
    }
  }
  return state;

};

export default updateNormalized;
