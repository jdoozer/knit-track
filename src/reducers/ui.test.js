import reducer from 'reducers/ui';
import * as uiMocks from 'mocks/uiMocks';

describe('UI reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(uiMocks.initialState)
  });

  it('should handle SELECT_PATTERN', () => {
    expect(reducer(uiMocks.initialState,
      {
        type: 'SELECT_PATTERN',
        payload: { patternId: uiMocks.patternId }
      }
    )).toEqual(uiMocks.pattern);
  });

  it('should handle DELETE_PATTERN', () => {
    expect(reducer(uiMocks.pattern,
      {
        type: 'DELETE_PATTERN',
        payload: { patternId: uiMocks.patternId }
      }
    )).toEqual(uiMocks.initialState);
  });

  it('should handle CLEAR_PATTERN', () => {
    expect(reducer(uiMocks.pattern,
      {
        type: 'DELETE_PATTERN',
        payload: { patternId: uiMocks.patternId }
      }
    )).toEqual(uiMocks.initialState);
  });

  it('should handle ADD_SECTION', () => {
    expect(reducer(uiMocks.initialState,
      {
        type: 'ADD_SECTION',
        payload: { sectionId: uiMocks.sectionId }
      }
    )).toEqual(uiMocks.section);
  });

  it('should handle CLEAR_SECTION', () => {
    expect(reducer(uiMocks.section,
      {
        type: 'CLEAR_SECTION',
        payload: { sectionId: uiMocks.sectionId }
      }
    )).toEqual(uiMocks.initialState);
  });

});
