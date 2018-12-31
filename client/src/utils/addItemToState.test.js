import addItemToState from 'utils/addItemToState';

const emptyDefault = { byId: {}, allIds: [] };
const oneItem = {
  byId: { 'id': { data: 'item data'} },
  allIds: ['id'],
};
const extraField = { field: 'field value' };
const oneItemWithField = {
  byId: { 'id': { data: 'item data'} },
  allIds: ['id'],
  field: 'field value',
};

describe('addItemToState utility function', () => {

  it('should add one item to a default empty state', () => {
    expect(addItemToState(emptyDefault, 'id', { data: 'item data' })).toEqual(oneItem);
  });

  it('should add one item plus field to a default empty state', () => {
    expect(addItemToState(
      emptyDefault,
      'id',
      { data: 'item data' },
      extraField
    )).toEqual(oneItemWithField);
  });

});
