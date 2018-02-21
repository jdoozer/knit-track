import reducer from 'reducers/sections';
import * as sectionMocks from 'mocks/sectionMocks';

describe('sections reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(sectionMocks.initialState)
  });

  it('should handle ADD_SECTION', () => {

    expect(reducer(sectionMocks.initialState,
      {
        type: 'ADD_SECTION',
        payload: {
          title: sectionMocks.title1,
          numRows: sectionMocks.numRows,
          patternId: sectionMocks.patternId,
          sectionId: sectionMocks.sectionId1
        }
      }
    )).toEqual(sectionMocks.oneSection);

    expect(reducer(sectionMocks.oneSection,
      {
        type: 'ADD_SECTION',
        payload: {
          title: sectionMocks.title2,
          numRows: sectionMocks.numRows,
          patternId: sectionMocks.patternId,
          sectionId: sectionMocks.sectionId2,
        }
      }
    )).toEqual(sectionMocks.twoSections);

  });

  it('should handle ADD_ROW', () => {
    expect(reducer(sectionMocks.twoSections,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: sectionMocks.sectionId1,
          rowId: sectionMocks.rowId1,
        }
      }
    )).toEqual(sectionMocks.twoSectionsOneRow);

    expect(reducer(sectionMocks.twoSectionsOneRow,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: sectionMocks.sectionId2,
          rowId: sectionMocks.rowId2,
        }
      }
    )).toEqual(sectionMocks.twoSectionsOneRowEach);

    expect(reducer(sectionMocks.twoSectionsOneRow,
      {
        type: 'ADD_ROW',
        payload: {
          sectionId: sectionMocks.sectionId1,
          rowId: sectionMocks.rowId2,
        }
      }
    )).toEqual(sectionMocks.twoSectionsTwoRows);
  });

  it('should handle UPDATE_ROW_COUNT', () => {
    expect(reducer(sectionMocks.oneSectionRows(5),
      {
        type: 'UPDATE_ROW_COUNT',
        payload: {
          sectionId: sectionMocks.sectionId1,
          updateType: 'INCREMENT'
        }
      }
    )).toEqual(sectionMocks.oneSectionRows(6));
    expect(reducer(sectionMocks.oneSectionRows(sectionMocks.numRows-1),
      {
        type: 'UPDATE_ROW_COUNT',
        payload: {
          sectionId: sectionMocks.sectionId1,
          updateType: 'INCREMENT'
        }
      }
    )).toEqual(sectionMocks.oneSectionRows(sectionMocks.numRows-1));
    expect(reducer(sectionMocks.oneSectionRows(5),
      {
        type: 'UPDATE_ROW_COUNT',
        payload: {
          sectionId: sectionMocks.sectionId1,
          updateType: 'DECREMENT'
        }
      }
    )).toEqual(sectionMocks.oneSectionRows(4));
    expect(reducer(sectionMocks.oneSectionRows(0),
      {
        type: 'UPDATE_ROW_COUNT',
        payload: {
          sectionId: sectionMocks.sectionId1,
          updateType: 'DECREMENT'
        }
      }
    )).toEqual(sectionMocks.oneSectionRows(0));
    expect(reducer(sectionMocks.oneSectionRows(8),
      {
        type: 'UPDATE_ROW_COUNT',
        payload: {
          sectionId: sectionMocks.sectionId1,
          updateType: 'RESET'
        }
      }
    )).toEqual(sectionMocks.oneSectionRows(0));
  });

});
