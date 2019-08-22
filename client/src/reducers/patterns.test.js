import reducer from 'reducers/patterns';
// import * as data from 'stateData/patternData';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
  lastCreatedId: ''
};

const initialStateWithError = {
  byId: {},
  allIds: [],
  loading: false,
  error: { message: 'error message goes here', status: 500 },
  lastCreatedId: ''
};


describe('patterns reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle clearing an error', () => {
    expect(reducer(initialStateWithError, {
      type: 'CLEAR_ERROR',
      payload: {
        dataTypes: ['patterns']
      }
    })).toEqual(initialState);
  });

});
