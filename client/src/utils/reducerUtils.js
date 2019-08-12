
export const addItem = (state, newItem, idField, updates) => {
  const newItemId = newItem[idField];
  if (newItem && newItemId) {
    return {
      ...state,
      byId: {
        ...state.byId,
        [newItemId]: {
          ...newItem,
          [idField]: newItemId,
        },
      },
      allIds: state.allIds.concat(newItemId),
      ...updates,
    };
  }
  return state;
};

export const mergeItems = (state, newItems, updates) => {
  if (newItems) {
    return {
      ...state,
      byId: {
        ...state.byId,
        ...newItems.byId,
      },
      allIds: [...new Set([...state.allIds ,...newItems.allIds])],
      ...updates,
    };
  }
  return state;
};

export const updateItem = (state, itemId, itemUpdates, stateUpdates) => {
  if (itemUpdates || stateUpdates) {
    return {
      ...state,
      byId: {
        ...state.byId,
        [itemId]: {
          ...state.byId[itemId],
          ...itemUpdates,
        }
      },
      ...stateUpdates
    };
  }
  return state;
};

export const updateState = (state, updates, payloadDataTypes, dataType) => {
  const updateDataBasedOnType = payloadDataTypes && payloadDataTypes.includes(dataType);
  const updateNoTypes = !payloadDataTypes;
  if (updateDataBasedOnType || updateNoTypes) {
    return { ...state, ...updates };
  }
  return state;
};
