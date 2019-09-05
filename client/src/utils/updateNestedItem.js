function updateNestedItem(input, key1, key2, newValue) {

  const itemToUpdate = input[key1];
  let updatedItem;

  if (Array.isArray(itemToUpdate)) {
    updatedItem = itemToUpdate.map((item, index) => (
      (index === key2) ? newValue : item
    ));
  }
  else {
    updatedItem = {
      ...itemToUpdate,
      [key2]: newValue
    }
  }

  if (Array.isArray(input)) {
    return input.map((item, index) => (
      (index === key1) ? updatedItem : (
        Array.isArray(item) ? [...item] : {...item}
      )
    ));
  }
  else {
    return {
      ...input,
      [key1]: updatedItem
    }
  }

};

export default updateNestedItem;
