import mergeNormalized from 'utils/mergeNormalized';

const emptyDefault = { byId: {}, allIds: [] };
const oneItem = {
  byId: { 'id': { data: 'item data'} },
  allIds: ['id'],
};
const twoItems = {
  byId: {
    'id1': { data: 'item data 1' },
    'id2': { data: 'item data 2' },
  },
  allIds: ['id1', 'id2'],
};
const oneItemPlusTwoItems = {
  byId: {
    'id': { data: 'item data' },
    'id1': { data: 'item data 1' },
    'id2': { data: 'item data 2' },
  },
  allIds: ['id', 'id1', 'id2'],
};
const allItemsPlusField = {
  byId: {
    'id': { data: 'item data' },
    'id1': { data: 'item data 1' },
    'id2': { data: 'item data 2' },
  },
  allIds: ['id', 'id1', 'id2'],
  field: 'field value',
};

describe('mergeNormalized utility function', () => {

  it('should add two items to a default empty state', () => {
    expect(mergeNormalized(emptyDefault, twoItems)).toEqual(twoItems);
  });

  it('should add two items to a state with one item', () => {
    expect(mergeNormalized(oneItem, twoItems)).toEqual(oneItemPlusTwoItems);
  });

  it('should add two items to a state with one item and update fields', () => {
    expect(mergeNormalized(
      oneItem,
      twoItems,
      { field: 'field value' }
    )).toEqual(allItemsPlusField);
  });

});


// const addItemToState = (state, itemId, item, ...args) => ({
//   ...state,
//   byId: {
//     ...state.byId,
//     [itemId]: item,
//   },
//   allIds: state.allIds.concat(itemId),
// });
