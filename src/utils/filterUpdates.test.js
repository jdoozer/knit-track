import filterUpdates from 'utils/filterUpdates';

const empty = { a: '', b: '' };
const aSet = { a: 'valueA', b: '' };
const aOnlySet = { a: 'valueA' };
const aOnlyEmpty = { a: '' };
const abSet = { a: 'valueA', b: 'valueB' };
const bOnlySet = { b: 'valueB' };
const bOnlyEmpty = { b: '' };

// tests
describe('filterUpdates utility function', () => {

  describe('should return full new object when old one not defined', () => {
    test('for empty new object', () => {
      expect(filterUpdates(empty, undefined)).toEqual(empty);
    });
    test('for new object with one item', () => {
      expect(filterUpdates(aSet, undefined)).toEqual(aSet);
    });
    test('for new object with all items', () => {
      expect(filterUpdates(abSet, undefined)).toEqual(abSet);
    });
  });

  describe('should return empty object if no fields changed', () => {
    test('for empty object', () => {
      expect(filterUpdates(empty, empty)).toEqual({});
    });
    test('for object with one item', () => {
      expect(filterUpdates(aSet, aSet)).toEqual({});
    });
    test('for object with all items', () => {
      expect(filterUpdates(abSet, abSet)).toEqual({});
    });
  });

  describe('should return object with only fields that changed', () => {
    test('starting with empty object', () => {
      expect(filterUpdates(aSet, empty)).toEqual(aOnlySet);
      expect(filterUpdates(abSet, empty)).toEqual(abSet);
    });
    test('starting with one item set', () => {
      expect(filterUpdates(empty, aSet)).toEqual(aOnlyEmpty);
      expect(filterUpdates(abSet, aSet)).toEqual(bOnlySet);
    });
    test('starting with two items set', () => {
      expect(filterUpdates(empty, abSet)).toEqual(empty);
      expect(filterUpdates(aSet, abSet)).toEqual(bOnlyEmpty);
    });
  });

});
