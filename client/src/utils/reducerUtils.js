
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

export const deleteItemsFromArray = (array, itemsToDelete) => {

  const itemsToDeleteType = typeof(itemsToDelete);

  if (itemsToDeleteType === 'object' && itemsToDelete.length) {
    return array.filter(currItem => !itemsToDelete.includes(currItem));
  }

  if (itemsToDeleteType === 'string') {
    return array.filter(currItem => !(currItem === itemsToDelete));
  }

  return array;

};

const deleteItemsByKeys = (obj, keys, keysToDelete) => {

  const keysToDeleteType = typeof(keysToDelete);

  if (keysToDeleteType === 'object' && keysToDelete.length) {
    return keys.reduce(
      (newObj, currKey) => {
        if (!keysToDelete.includes(currKey))  newObj[currKey] = obj[currKey];
        return newObj;
      },
      {}
    );
  }

  if (keysToDeleteType === 'string') {
    return keys.reduce(
      (newObj, currKey) => {
        if (!(keysToDelete === currKey))  newObj[currKey] = obj[currKey];
        return newObj;
      },
      {}
    );
  }

  return obj;

};

export const deleteFromState = (state, itemIds) => {
  if (itemIds) {
    return {
      ...state,
      byId: deleteItemsByKeys(state.byId, state.allIds, itemIds),
      allIds: deleteItemsFromArray(state.allIds, itemIds),
    }
  }
  return state;
};
