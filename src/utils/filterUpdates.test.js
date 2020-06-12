import filterUpdates, { filterArrayUpdates } from 'utils/filterUpdates';

const empty = { a: '', b: '' };
const aSet = { a: 'valueA', b: '' };
const aOnlySet = { a: 'valueA' };
const aOnlyEmpty = { a: '' };
const abSet = { a: 'valueA', b: 'valueB' };
const bOnlySet = { b: 'valueB' };
const bOnlyEmpty = { b: '' };

const arr1 = [{ c1: 'valc1', c2: 'valc2' }];
const arr2 = [{ c1: 'valc1', c2: 'valc2' }, { c1: 'valc1b', c2: 'valc2b' }];
// const arr3 = [{ c1: 'valc1', c2: 'valc2a' }, { c1: 'valc1b', c2: 'valc2b' }];

const abc1 = { a: 'valueA', b: 'valueB', c: [...arr1] };
const abc2 = { a: 'valueA', b: 'valueB', c: [...arr2] };

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
    test('for new object with all items and array', () => {
      expect(filterUpdates(abc1, undefined)).toEqual(abc1);
    });
  });

  describe('should return undefined if no fields changed', () => {
    test('for empty object', () => {
      expect(filterUpdates(empty, empty)).toEqual(undefined);
    });
    test('for object with one item', () => {
      expect(filterUpdates(aSet, aSet)).toEqual(undefined);
    });
    test('for object with all items', () => {
      expect(filterUpdates(abSet, abSet)).toEqual(undefined);
    });
    test('for object with all items and 1-element array', () => {
      expect(filterUpdates(abc1, abc1)).toEqual(undefined);
    });
    test('for object with all items and 2-element array', () => {
      expect(filterUpdates(abc2, abc2)).toEqual(undefined);
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
    test('starting with two items and array of objects', () => {
      expect(filterUpdates(empty, abc1)).toEqual(empty);
      expect(filterUpdates(empty, abc2)).toEqual(empty);
      expect(filterUpdates(abc2, abc1)).toEqual({ c: arr2 });
      expect(filterUpdates(abc1, abc2)).toEqual({ c: [arr1[0], null] });
    });
  });

});


// const arr1 = [{ c1: 'valc1', c2: 'valc2' }];
// const arr2 = [{ c1: 'valc1', c2: 'valc2' }, { c1: 'valc1b', c2: 'valc2b' }];
