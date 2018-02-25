import reducer from 'reducers/patterns';
import * as patternMocks from 'mocks/patternMocks';

describe('patterns reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(patternMocks.initialStatePatterns)
  });

  it('should handle ADD_PATTERN', () => {

    expect(reducer(patternMocks.initialStatePatterns,
      {
        type: 'ADD_PATTERN',
        payload: { title: patternMocks.patternTitle1, patternId: patternMocks.patternId1 }
      }
    )).toEqual(patternMocks.onePattern);

    expect(reducer(patternMocks.onePattern,
      {
        type: 'ADD_PATTERN',
        payload: { title: patternMocks.patternTitle2, patternId: patternMocks.patternId2 }
      }
    )).toEqual(patternMocks.twoPatterns);

  });

  it('should handle ADD_SECTION', () => {
    expect(reducer(patternMocks.twoPatterns,
      {
        type: 'ADD_SECTION',
        payload: {
          title: 'section title',
          numRows: 10,
          patternId: patternMocks.patternId2,
          sectionId: patternMocks.sectionId1,
        }
      }
    )).toEqual(patternMocks.twoPatternsOneSection);

    expect(reducer(patternMocks.twoPatternsOneSection,
      {
        type: 'ADD_SECTION',
        payload: {
          title: 'section title',
          numRows: 10,
          patternId: patternMocks.patternId2,
          sectionId: patternMocks.sectionId2,
        }
      }
    )).toEqual(patternMocks.twoPatternsTwoSections)

  });
});
