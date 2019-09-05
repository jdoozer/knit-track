
export function addItem(state, newItem, idField, updates) {
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
}


export function mergeItems(state, newItems, stateUpdates, itemUpdates) {
  if (newItems) {
    const newState = {
      ...state,
      byId: {
        ...state.byId,
        ...newItems.byId,
      },
      allIds: [...new Set([...state.allIds ,...newItems.allIds])],
      ...stateUpdates,
    };
    if (itemUpdates) {
      newItems.allIds.forEach(
        itemId => {
          newState.byId[itemId] = { ...newState.byId[itemId], ...itemUpdates };
        }
      );
    }
    return newState;
  }
  return state;
}


export function updateItem(state, itemId, itemUpdates) {
  if (itemId && itemUpdates) {
    return {
      ...state,
      byId: {
        ...state.byId,
        [itemId]: {
          ...state.byId[itemId],
          ...itemUpdates,
        }
      },
    };
  }
  return state;
}


export function updateState(state, updates) {
  if (updates) {
    return { ...state, ...updates };
  }
  return state;
}


export function deleteItemsFromArray(array, itemsToDelete) {

  const itemsToDeleteType = typeof(itemsToDelete);

  if (itemsToDeleteType === 'object' && itemsToDelete.length) {
    return array.filter(currItem => !itemsToDelete.includes(currItem));
  }

  if (itemsToDeleteType === 'string') {
    return array.filter(currItem => !(currItem === itemsToDelete));
  }

  return array;

}


function deleteItemsByKeys(obj, keys, keysToDelete) {

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

}

export function deleteFromState(state, itemIds) {
  if (itemIds) {
    return {
      ...state,
      byId: deleteItemsByKeys(state.byId, state.allIds, itemIds),
      allIds: deleteItemsFromArray(state.allIds, itemIds),
    }
  }
  return state;
}
