import sharedReducer from 'reducers/shared';

const testError = { message: 'error message goes here', status: 500 };
const testId = 'pattern-ID-goes-here';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
  lastCreatedId: '',
  lastActionType: ''
};

const initialStateWithError = {
  byId: {},
  allIds: [],
  loading: false,
  error: testError,
  lastCreatedId: '',
  lastActionType: ''
};

const stateOneItem = {
  ...initialState,
  byId: {
    [testId]: {
      patternId: testId,
      loading: false,
      error: null,
      lastActionType: ''
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
      error: testError,
      lastActionType: ''
    }
  },
};

const reducer = sharedReducer('patterns');

describe('shared reducer acting on patterns', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle clearing an error', () => {
    expect(reducer(initialStateWithError, {
      type: 'CLEAR_ERROR',
      payload: {
        dataType: 'patterns'
      }
    })).toEqual(initialState);
  });

  describe('RECEIVE_ERROR reducer', () => {
    it('should ignore an error for \'sections\' without id', () => {
      expect(reducer(initialState, {
        type: 'RECEIVE_ERROR',
        payload: {
          dataType: 'sections',
          error: testError,
        }
      })).toEqual(initialState);
    });
    it('should ignore an error for \'sections\' with id', () => {
      expect(reducer(initialState, {
        type: 'RECEIVE_ERROR',
        payload: {
          dataType: 'sections',
          error: testError,
          id: testId
        }
      })).toEqual(initialState);
    });
    it('should update an error for \'patterns\' without id', () => {
      expect(reducer(initialState, {
        type: 'RECEIVE_ERROR',
        payload: {
          dataType: 'patterns',
          error: testError,
        }
      })).toEqual(initialStateWithError);
    });
    it('should update an error for \'patterns\' with id', () => {
      expect(reducer(stateOneItem, {
        type: 'RECEIVE_ERROR',
        payload: {
          dataType: 'patterns',
          error: testError,
          id: testId
        }
      })).toEqual(stateOneItemWithError);
    });
  });

});
