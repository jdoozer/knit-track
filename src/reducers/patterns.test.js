import reducer from 'reducers/patterns';
// import * as data from 'testData/patternData';

const testError = { message: 'error message goes here', status: 500 };
const testId = 'pattern-ID-goes-here';

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
  error: testError,
  lastCreatedId: ''
};

const stateOneItem = {
  ...initialState,
  byId: {
    [testId]: {
      patternId: testId,
      loading: false,
      error: null
    }
  },
  allIds: [testId]
};

const stateOneItemWithError = {
  ...stateOneItem,
  byId: {
    [testId]: {
      patternId: testId,
      loading: false,
      error: testError
    }
  },
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

  describe('RECEIVE_ERROR reducer', () => {
    it('should ignore an error for \'sections\' without id', () => {
      expect(reducer(initialState, {
        type: 'RECEIVE_ERROR',
        payload: {
          dataTypes: ['sections'],
          error: testError,
        }
      })).toEqual(initialState);
    });
    it('should ignore an error for \'sections\' with id', () => {
      expect(reducer(initialState, {
        type: 'RECEIVE_ERROR',
        payload: {
          dataTypes: ['sections'],
          error: testError,
          id: testId
        }
      })).toEqual(initialState);
    });
    it('should update an error for \'patterns\' without id', () => {
      expect(reducer(initialState, {
        type: 'RECEIVE_ERROR',
        payload: {
          dataTypes: ['patterns'],
          error: testError,
        }
      })).toEqual(initialStateWithError);
    });
    it('should update an error for \'patterns\' with id', () => {
      expect(reducer(stateOneItem, {
        type: 'RECEIVE_ERROR',
        payload: {
          dataTypes: ['patterns'],
          error: testError,
          id: testId
        }
      })).toEqual(stateOneItemWithError);
    });
  });

});
