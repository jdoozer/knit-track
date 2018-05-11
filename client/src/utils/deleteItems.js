
const deleteItems = (array, items) => (
  array.filter(currItem => !items.includes(currItem))
);

export default deleteItems;
