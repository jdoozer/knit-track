
function addItem(state, newItem, idField, updates) {
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
      allIds: [...new Set([...state.allIds, newItemId])],
      ...updates,
    };
  }
  return state;
}

// mergeItems assumes the input has byId, allId fields
function mergeItems(state, newItems, stateUpdates, newItemFields) {

  if (!newItems)
    return state;

  const newState = {
    ...state,
    byId: { ...state.byId, },
    allIds: [...new Set([...state.allIds ,...newItems.allIds])],
    ...stateUpdates,
  };

  newItems.allIds.forEach(itemId => {
    newState.byId[itemId] = {
      ...state.byId[itemId],
      ...newItems.byId[itemId],
      ...newItemFields,
    };
  });

  return newState;

}

function mergeItemsKeepItemFields(state, newItems, stateUpdates, newItemFields) {

  if (!newItems)
    return state;

  const newState = {
    ...state,
    byId: { ...state.byId, },
    allIds: [...new Set([...state.allIds ,...newItems.allIds])],
    ...stateUpdates,
  };

  newItems.allIds.forEach(itemId => {
    newState.byId[itemId] = {
      ...newItemFields,
      ...state.byId[itemId],
      ...newItems.byId[itemId],
    };
  });

  return newState;

}


function update(state, updates, itemId) {
  if (updates) {
    if (itemId) {
      return {
        ...state,
        byId: {
          ...state.byId,
          [itemId]: {
            ...state.byId[itemId],
            ...updates,
          }
        },
      };
    } else {
      return { ...state, ...updates };
    }
  }
  return state;
}


function checkDeleteFunc(deleteKeys) {

  const keysType = typeof(deleteKeys);

  if (keysType === 'string' && deleteKeys)
    return (input, data) => (input === data);

  if (keysType === 'object' && deleteKeys.length)
    return (input, data) => (input.includes(data));

  return null;
}


function deleteItemsFromArray(array, itemsToDelete) {

  const checkDelete = checkDeleteFunc(itemsToDelete);

  if (!checkDelete)
    return array;

  return array.filter(currItem => !checkDelete(itemsToDelete, currItem));

}

function deleteItemsByKeys(obj, keys, keysToDelete) {

  const checkDelete = checkDeleteFunc(keysToDelete);

  if (!checkDelete)
    return obj;

  return keys.reduce((newObj, currKey) => {
    if (!checkDelete(keysToDelete, currKey))
      newObj[currKey] = obj[currKey];
    return newObj;
  }, {});
}


function deleteFromState(state, itemIds) {
  if (itemIds) {
    return {
      ...state,
      byId: deleteItemsByKeys(state.byId, state.allIds, itemIds),
      allIds: deleteItemsFromArray(state.allIds, itemIds),
    }
  }
  return state;
}

export {
  addItem, mergeItems, mergeItemsKeepItemFields, update,
  deleteItemsFromArray, deleteFromState
};
