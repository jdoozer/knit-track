import reducer from 'reducers';

const initialState = {
  patterns: {
    byId: {},
    allIds: [],
    selected: null,
  },
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

describe('full reducer test', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  // it('should handle DELETE_PATTERN');
  // it('should handle DELETE_SECTION');
});
