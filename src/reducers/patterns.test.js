import reducer from 'reducers/patterns';
import * as data from 'testData/patternData';

describe('patterns reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(data.initialState)
  });

  it('should handle ADD_PATTERN', () => {

    expect(reducer(data.initialState,
      {
        type: 'ADD_PATTERN',
        payload: { title: data.patternTitle1, patternId: data.patternId1 }
      }
    )).toEqual(data.onePattern);

    expect(reducer(data.onePattern,
      {
        type: 'ADD_PATTERN',
        payload: { title: data.patternTitle2, patternId: data.patternId2 }
      }
    )).toEqual(data.twoPatterns);

  });

  it('should handle ADD_SECTION', () => {
    expect(reducer(data.twoPatterns,
      {
        type: 'ADD_SECTION',
        payload: {
          title: 'section title',
          numRows: 10,
          patternId: data.patternId2,
          sectionId: data.sectionId1,
        }
      }
    )).toEqual(data.twoPatternsOneSection);

    expect(reducer(data.twoPatternsOneSection,
      {
        type: 'ADD_SECTION',
        payload: {
          title: 'section title',
          numRows: 10,
          patternId: data.patternId2,
          sectionId: data.sectionId2,
        }
      }
    )).toEqual(data.twoPatternsTwoSections)

  });
});
