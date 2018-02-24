import reducer from 'reducers/rows';
import * as rowMocks from 'mocks/rowMocks';

describe('rows reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(rowMocks.initialState)
  });

  it('should handle ADD_ROW', () => {

    expect(reducer(rowMocks.initialState,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: rowMocks.sectionId1,
          rowId: rowMocks.rowId1,
          dummyInfo: 'dummy info',
        }
      }
    )).toEqual(rowMocks.oneRow);

    expect(reducer(rowMocks.oneRow,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: rowMocks.sectionId1,
          rowId: rowMocks.rowId2,
          dummyInfo: 'dummy info',
        }
      }
    )).toEqual(rowMocks.twoRows);

    expect(reducer(rowMocks.twoRows,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: rowMocks.sectionId2,
          rowId: rowMocks.rowId3,
          dummyInfo: 'dummy info',
        }
      }
    )).toEqual(rowMocks.threeRows);
  });

  it('should handle DELETE_ROW', () => {

    expect(reducer(rowMocks.threeRows,
      {
        type: 'DELETE_ROW',
        payload: { rowIds: rowMocks.rowId3, }
      }
    )).toEqual(rowMocks.twoRows);

    expect(reducer(rowMocks.twoRows,
      {
        type: 'DELETE_ROW',
        payload: { rowIds: [rowMocks.rowId1, rowMocks.rowId2], }
      }
    )).toEqual(rowMocks.initialState);
  });

});
