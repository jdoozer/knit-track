import reducer from 'reducers';
import { initialStatePatterns, onePattern } from 'mockData';

const initialState = {
  patterns: initialStatePatterns,
  sections: {
    byId: {},
    allIds: [],
    sectionToEdit: null,
  },
  rows: {
    byId: {},
    allIds: [],
  }
};

const onePatternState = {
  ...initialState,
  patterns: onePattern,
};

describe('full reducer test', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle ADD_PATTERN', () => {
    expect(reducer(
      initialState,
      {
        type: 'ADD_PATTERN',
        payload: { title: 'pattern title', patternId: 'patternIdString' }
      }
    )).toEqual(onePatternState)
  });

  // it('should handle DELETE_PATTERN');
  // it('should handle DELETE_SECTION');
});
