import reducer from 'reducers';
import * as data from 'stateData/fullStateData';

describe('full reducer test', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(data.initialState)
  });

  it('should handle DELETE_PATTERN without sections', () => {

    expect(reducer(data.onePattern,
      {
        type: 'DELETE_PATTERN',
        payload: data.patternIds(1)
      }
    )).toEqual(data.initialState);

    expect(reducer(data.twoPatterns,
      {
        type: 'DELETE_PATTERN',
        payload: data.patternIds(2)
      }
    )).toEqual(data.onePattern);

  });

  it('should handle DELETE_PATTERN with sections', () => {

    expect(reducer(data.onePatternTwoSections,
      {
        type: 'DELETE_PATTERN',
        payload: data.patternIds(1)
      }
    )).toEqual(data.initialState);

    expect(reducer(data.twoPatternsTwoSections,
      {
        type: 'DELETE_PATTERN',
        payload: data.patternIds(2)
      }
    )).toEqual(data.onePatternTwoSections);

  });

  it('should handle DELETE_SECTION', () => {

    expect(reducer(data.onePatternOneSection,
      {
        type: 'DELETE_SECTION',
        payload: data.sectionIds(1)
      }
    )).toEqual(data.onePattern);

    expect(reducer(data.onePatternTwoSections,
      {
        type: 'DELETE_SECTION',
        payload: data.sectionIds(2)
      }
    )).toEqual(data.onePatternOneSection);

  });

});
