import reducer from 'reducers/ui';
import * as data from 'stateData/uiData';

describe('UI reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(data.initialState)
  });

  it('should handle SELECT_PATTERN', () => {
    expect(reducer(data.initialState,
      {
        type: 'SELECT_PATTERN',
        payload: { patternId: data.patternId }
      }
    )).toEqual(data.pattern);
  });

  it('should handle DELETE_PATTERN', () => {
    expect(reducer(data.pattern,
      {
        type: 'DELETE_PATTERN',
        payload: { patternId: data.patternId }
      }
    )).toEqual(data.initialState);
  });

  it('should handle CLEAR_PATTERN', () => {
    expect(reducer(data.pattern,
      {
        type: 'DELETE_PATTERN',
        payload: { patternId: data.patternId }
      }
    )).toEqual(data.initialState);
  });

  it('should handle ADD_SECTION', () => {
    expect(reducer(data.initialState,
      {
        type: 'ADD_SECTION',
        payload: { sectionId: data.sectionId }
      }
    )).toEqual(data.section);
  });

  it('should handle CLEAR_SECTION', () => {
    expect(reducer(data.section,
      {
        type: 'CLEAR_SECTION',
        payload: { sectionId: data.sectionId }
      }
    )).toEqual(data.initialState);
  });

});
