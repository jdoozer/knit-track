import reducer from 'reducers/patterns';
import * as data from 'stateData/patternData';

describe('patterns reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(data.initialState)
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
