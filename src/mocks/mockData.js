import stateSnapshot from 'mocks/stateSnapshot';


export const patternTitle1 = 'pattern title';
export const patternTitle2 = 'pattern title 2';
export const patternId1 = 'patternIdString';
export const patternId2 = 'patternIdString2';
export const patternInfo = '<pattern info placeholder>';


export const initialStatePatterns = {
  byId: {},
  allIds: [],
  selected: null,
};

export const initialStateSections = {
  byId: {},
  allIds: [],
  sectionToEdit: null,
};

export const initialStateRows = {
  byId: {},
  allIds: [],
};

export const initialState = {
  patterns: initialStatePatterns,
  sections: initialStateSections,
  rows: initialStateRows,
};

export const onePattern = {
  byId: {
    [patternId1]: {
      patternId: patternId1,
      title: patternTitle1,
      sections: [],
      info: patternInfo,
    },
  },
  allIds: [patternId1],
  selected: null,
};

export const twoPatterns = {
  byId: {
    ...onePattern.byId,
    [patternId2]: {
      patternId: patternId2,
      title: patternTitle2,
      sections: [],
      info: patternInfo,
    },
  },
  allIds: [patternId1, patternId2],
  selected: null,
};

export const twoPatternsSecondSelected = {
  ...twoPatterns,
  selected: patternId2
};

export const onePatternState = {
  ...initialState,
  patterns: onePattern,
};
