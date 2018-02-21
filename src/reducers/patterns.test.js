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

  it('should handle SELECT_PATTERN', () => {
    expect(reducer(patternMocks.twoPatterns,
      {
        type: 'SELECT_PATTERN',
        payload: { patternId: patternMocks.patternId2 }
      }
    )).toEqual(patternMocks.twoPatternsSecondSelected);
  });

  it('should handle ADD_SECTION', () => {
    expect(reducer(patternMocks.twoPatternsSecondSelected,
      {
        type: 'ADD_SECTION',
        payload: {
          title: 'section title',
          numRows: 10,
          patternId: patternMocks.patternId2,
          sectionId: patternMocks.sectionId1,
        }
      }
    )).toEqual(patternMocks.twoPatternsSecondSelectedOneSection);

    expect(reducer(patternMocks.twoPatternsSecondSelectedOneSection,
      {
        type: 'ADD_SECTION',
        payload: {
          title: 'section title',
          numRows: 10,
          patternId: patternMocks.patternId2,
          sectionId: patternMocks.sectionId2,
        }
      }
    )).toEqual(patternMocks.twoPatternsSecondSelectedTwoSections)

  });
});
