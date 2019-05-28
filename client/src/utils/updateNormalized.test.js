import updateNormalized from 'utils/updateNormalized';

const twoItems = {
  byId: {
    'id1': { data: 'item data 1' },
    'id2': { data: 'item data 2' },
  },
  allIds: ['id1', 'id2'],
};
const twoItemsUpdatedField = {
  byId: {
    'id1': { data: 'item data 1' },
    'id2': { data: 'item data 2 updated' },
  },
  allIds: ['id1', 'id2'],
};
const twoItemsNewField = {
  byId: {
    'id1': { data: 'item data 1', moreData: 'more item data 1' },
    'id2': { data: 'item data 2'},
  },
  allIds: ['id1', 'id2'],
};

describe('updateNormalized utility function', () => {

  it('should update correct item when field exists', () => {
    expect(updateNormalized(
      twoItems,
      'id2',
      { data: 'item data 2 updated' }
    )).toEqual(twoItemsUpdatedField);
  });

  it('should update correct item with a new field', () => {
    expect(updateNormalized(
      twoItems,
      'id1',
      { moreData: 'more item data 1' }
    )).toEqual(twoItemsNewField);
  });

  it('should do nothing when item doesn\'t already exist', () => {
    expect(updateNormalized(
      twoItems,
      'id4',
      { data: 'item data 4' }
    )).toEqual(twoItems);
  });

});
