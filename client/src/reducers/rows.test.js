import reducer from 'reducers/rows';
import * as data from 'stateData/rowData';

describe('rows reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(data.initialState)
  });

  it('should handle ADD_ROW', () => {

    expect(reducer(data.initialState,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: data.sectionId1,
          rowId: data.rowId1,
          dummyInfo: 'dummy info',
        }
      }
    )).toEqual(data.oneRow);

    expect(reducer(data.oneRow,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: data.sectionId1,
          rowId: data.rowId2,
          dummyInfo: 'dummy info',
        }
      }
    )).toEqual(data.twoRows);

    expect(reducer(data.twoRows,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: data.sectionId2,
          rowId: data.rowId3,
          dummyInfo: 'dummy info',
        }
      }
    )).toEqual(data.threeRows);
  });

  it('should handle DELETE_ROW', () => {

    expect(reducer(data.threeRows,
      {
        type: 'DELETE_ROW',
        payload: data.rowId3
      }
    )).toEqual(data.twoRows);

    expect(reducer(data.twoRows,
      {
        type: 'DELETE_ROW',
        payload: [data.rowId1, data.rowId2]
      }
    )).toEqual(data.initialState);
  });

});
