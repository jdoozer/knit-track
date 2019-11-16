import { deleteFromState, deleteItemsFromArray, update } from 'utils/reducerUtils';
// import * as data from 'testData/patternData';

const emptyState = {
  byId: {},
  allIds: [],
};

const oneItem = {
  byId: {
    id1: {
      id: 'id1',
      word: 'hi'
    }
  },
  allIds: ['id1']
};

const twoItems = {
  byId: {
    id1: {
      id: 'id1',
      word: 'hi'
    },
    id2: {
      id: 'id2',
      word: 'there'
    }
  },
  allIds: ['id1', 'id2']
};

const threeItems = {
  byId: {
    id1: {
      id: 'id1',
      word: 'hi'
    },
    id2: {
      id: 'id2',
      word: 'there'
    },
    id3: {
      id: 'id3',
      word: 'hey'
    }
  },
  allIds: ['id1', 'id2', 'id3']
};

const newFields = { field1: 'value1', field2: 'value2' };

const twoItemsNewFieldsItem1 = {
  byId: {
    id1: {
      id: 'id1',
      word: 'hi',
      ...newFields,
    },
    id2: {
      id: 'id2',
      word: 'there'
    }
  },
  allIds: ['id1', 'id2']
};

const twoItemsNewFieldsItem3 = {
  byId: {
    id1: {
      id: 'id1',
      word: 'hi',
    },
    id2: {
      id: 'id2',
      word: 'there'
    },
    id3: {
      ...newFields
    }
  },
  allIds: ['id1', 'id2']
};



describe('reducer utility deleteItemsFromArray', () => {

  it('should return the given array with no keys', () => {
    expect(
      deleteItemsFromArray(emptyState.allIds, [])
    ).toEqual(emptyState.allIds);
    expect(
      deleteItemsFromArray(oneItem.allIds, [])
    ).toEqual(oneItem.allIds);
    expect(
      deleteItemsFromArray(twoItems.allIds, [])
    ).toEqual(twoItems.allIds);
    expect(
      deleteItemsFromArray(threeItems.allIds, [])
    ).toEqual(threeItems.allIds);
  });

  it('should handle deleting one item with array input', () => {
    expect(
      deleteItemsFromArray(oneItem.allIds, ['id1'])
    ).toEqual(emptyState.allIds);
    expect(
      deleteItemsFromArray(twoItems.allIds, ['id2'])
    ).toEqual(oneItem.allIds);
    expect(
      deleteItemsFromArray(threeItems.allIds, ['id3'])
    ).toEqual(twoItems.allIds);
  });

  it('should handle deleting one item with string input', () => {
    expect(
      deleteItemsFromArray(oneItem.allIds, 'id1')
    ).toEqual(emptyState.allIds);
    expect(
      deleteItemsFromArray(twoItems.allIds, 'id2')
    ).toEqual(oneItem.allIds);
    expect(
      deleteItemsFromArray(threeItems.allIds, 'id3')
    ).toEqual(twoItems.allIds);
  });

  it('should handle deleting two items', () => {
    expect(
      deleteItemsFromArray(twoItems.allIds, ['id1', 'id2'])
    ).toEqual(emptyState.allIds);
    expect(
      deleteItemsFromArray(threeItems.allIds, ['id2', 'id3'])
    ).toEqual(oneItem.allIds);
  });

});

describe('reducer utility deleteFromState', () => {

  it('should return the given state with no keys', () => {
    expect(deleteFromState(emptyState, [])).toEqual(emptyState);
    expect(deleteFromState(oneItem, [])).toEqual(oneItem);
    expect(deleteFromState(twoItems, [])).toEqual(twoItems);
    expect(deleteFromState(threeItems, [])).toEqual(threeItems);
  });

  it('should handle deleting one item', () => {
    expect(deleteFromState(oneItem, ['id1'])).toEqual(emptyState);
    expect(deleteFromState(twoItems, ['id2'])).toEqual(oneItem);
    expect(deleteFromState(threeItems, ['id3'])).toEqual(twoItems);
  });

  it('should handle deleting two items', () => {
    expect(deleteFromState(twoItems, ['id1', 'id2'])).toEqual(emptyState);
    expect(deleteFromState(threeItems, ['id2', 'id3'])).toEqual(oneItem);
  });

});

describe('reducer utility update', () => {
// update(state, itemId, itemUpdates)

  it('should do nothing when no updates given', () => {
    expect(update(twoItems, undefined, undefined)).toEqual(twoItems);
  });

  it('should update item when item updates given for existing item', () => {
    expect(
      update(twoItems, newFields, 'id1')
    ).toEqual(twoItemsNewFieldsItem1);
  });

  it('should create item when item updates given for non-existing item', () => {
    expect(
      update(twoItems, newFields, 'id3')
    ).toEqual(twoItemsNewFieldsItem3);
  });
});
