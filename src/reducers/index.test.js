import reducer from 'reducers';

const initialState = {
  patterns: {
    byId: {},
    allIds: [],
  },
  sections: {
    byId: {},
    allIds: [],
  },
  rows: {
    byId: {},
    allIds: [],
  },
  ui: {
    selectedPattern: null,
    sectionToEdit: null,
  }
};

describe('full reducer test', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  // it('should handle DELETE_PATTERN');
  // it('should handle DELETE_SECTION');
});
