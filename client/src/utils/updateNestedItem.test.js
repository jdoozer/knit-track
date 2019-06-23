import updateNestedItem from 'utils/updateNestedItem';

// values to update to
const newArrValue = 100;
const newObjName = 'Gonzo';

// baselines
const arr0 = [0, 0, 0, 0];
const arr1 = [1, 1, 1, 1];
const arr1Mod2 = [1, 1, newArrValue, 1];
const obj0 = { name: 'Kermit', song: 'Rainbow Connection' };
const obj0ModName = { name: newObjName, song: 'Rainbow Connection' };
const obj1 = { name: 'Miss Piggy', song: 'All Alone' };

// nested items
const arr = [arr0, arr1, obj0, obj1];
const arrModArr12 = [arr0, arr1Mod2, obj0, obj1];
const arrModObj2 = [arr0, arr1, obj0ModName, obj1];

const obj = { arr0, arr1, obj0, obj1 };
const objModArr12 = { arr0, arr1: arr1Mod2, obj0, obj1 };
const objModObj = { arr0, arr1, obj0: obj0ModName, obj1 };

// tests
describe('updateNestedItem utility function', () => {
  describe('should update a nested item', () => {
    test('array within array', () => {
      expect(updateNestedItem(arr, 1, 2, newArrValue)).toEqual(arrModArr12);
    });

    test('object within array', () => {
      expect(updateNestedItem(arr, 2, 'name', newObjName)).toEqual(arrModObj2);
    });

    test('array within object', () => {
      expect(updateNestedItem(obj, 'arr1', 2, newArrValue)).toEqual(objModArr12);
    });

    test('object within object', () => {
      expect(updateNestedItem(obj, 'obj0', 'name', newObjName)).toEqual(objModObj);
    });
  });

  describe('should copy items that aren\'t updated', () => {
    test('updating array within array', () => {
      expect(updateNestedItem(arr, 1, 2, newArrValue)[0]).not.toBe(arr[0]); //array
      expect(updateNestedItem(arr, 1, 2, newArrValue)[3]).not.toBe(arr[3]); //object
    });

    test('updating object within array', () => {
      expect(updateNestedItem(arr, 2, 'name', newObjName)[0]).not.toBe(arr[0]); //array
      expect(updateNestedItem(arr, 2, 'name', newObjName)[3]).not.toBe(arr[3]); //object
    });

    test('array within object', () => {
      expect(updateNestedItem(obj, 'arr1', 2, newArrValue)[0]).not.toBe(arr[0]); //array
      expect(updateNestedItem(obj, 'arr1', 2, newArrValue)[3]).not.toBe(arr[3]); //object
    });

    test('object within object', () => {
      expect(updateNestedItem(obj, 'obj0', 'name', newObjName)[0]).not.toBe(arr[0]); //array
      expect(updateNestedItem(obj, 'obj0', 'name', newObjName)[3]).not.toBe(arr[3]); //object
    });
  });

});
