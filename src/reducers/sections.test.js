import reducer from 'reducers/sections';
import * as data from 'testData/sectionData';

describe('sections reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(data.initialState)
  });

  it('should handle ADD_SECTION', () => {

    expect(reducer(data.initialState,
      {
        type: 'ADD_SECTION',
        payload: {
          title: data.title1,
          numRows: data.numRows,
          patternId: data.patternId,
          sectionId: data.sectionId1
        }
      }
    )).toEqual(data.oneSection);

    expect(reducer(data.oneSection,
      {
        type: 'ADD_SECTION',
        payload: {
          title: data.title2,
          numRows: data.numRows,
          patternId: data.patternId,
          sectionId: data.sectionId2,
        }
      }
    )).toEqual(data.twoSections);

  });

  it('should handle ADD_ROW', () => {
    expect(reducer(data.twoSections,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: data.sectionId1,
          rowId: data.rowId1,
        }
      }
    )).toEqual(data.twoSectionsOneRow);

    expect(reducer(data.twoSectionsOneRow,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: data.sectionId2,
          rowId: data.rowId2,
        }
      }
    )).toEqual(data.twoSectionsOneRowEach);

    expect(reducer(data.twoSectionsOneRow,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: data.sectionId1,
          rowId: data.rowId2,
        }
      }
    )).toEqual(data.twoSectionsTwoRows);
  });

  it('should handle UPDATE_ROW_COUNT', () => {
    expect(reducer(data.oneSectionRows(5),
      {
        type: 'UPDATE_ROW_COUNT',
        payload: {
          sectionId: data.sectionId1,
          updateType: 'INCREMENT'
        }
      }
    )).toEqual(data.oneSectionRows(6));
    expect(reducer(data.oneSectionRows(data.numRows-1),
      {
        type: 'UPDATE_ROW_COUNT',
        payload: {
          sectionId: data.sectionId1,
          updateType: 'INCREMENT'
        }
      }
    )).toEqual(data.oneSectionRows(data.numRows-1));
    expect(reducer(data.oneSectionRows(5),
      {
        type: 'UPDATE_ROW_COUNT',
        payload: {
          sectionId: data.sectionId1,
          updateType: 'DECREMENT'
        }
      }
    )).toEqual(data.oneSectionRows(4));
    expect(reducer(data.oneSectionRows(0),
      {
        type: 'UPDATE_ROW_COUNT',
        payload: {
          sectionId: data.sectionId1,
          updateType: 'DECREMENT'
        }
      }
    )).toEqual(data.oneSectionRows(0));
    expect(reducer(data.oneSectionRows(8),
      {
        type: 'UPDATE_ROW_COUNT',
        payload: {
          sectionId: data.sectionId1,
          updateType: 'RESET'
        }
      }
    )).toEqual(data.oneSectionRows(0));
  });

});
