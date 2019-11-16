import reducer from 'reducers/patterns';


const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
  lastCreatedId: '',
  lastActionType: ''
};


describe('patterns reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

});
