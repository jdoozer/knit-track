import { initialStateNormal } from 'testData/initialState';

export const patternTitle1 = 'pattern title';
export const patternTitle2 = 'pattern title 2';
export const patternId1 = 'patternIdString1';
export const patternId2 = 'patternIdString2';
export const patternInfo = '<pattern info placeholder>';
export const sectionId1 = 'sectionIdString1';
export const sectionId2 = 'sectionIdString2';

export const initialState = initialStateNormal;

export const onePattern = {
  ...initialState,
  byId: {
    [patternId1]: {
      patternId: patternId1,
      title: patternTitle1,
      sectionIds: [],
      info: patternInfo,
    },
  },
  allIds: [patternId1],
};

export const twoPatterns = {
  ...initialState,
  byId: {
    ...onePattern.byId,
    [patternId2]: {
      patternId: patternId2,
      title: patternTitle2,
      sectionIds: [],
      info: patternInfo,
    },
  },
  allIds: [patternId1, patternId2],
};

export const twoPatternsOneSection = {
  ...twoPatterns,
  byId: {
    ...twoPatterns.byId,
    [patternId2]: {
      ...twoPatterns.byId[patternId2],
      sectionIds: [sectionId1],
    }
  }
};

export const twoPatternsTwoSections = {
  ...twoPatterns,
  byId: {
    ...twoPatterns.byId,
    [patternId2]: {
      ...twoPatterns.byId[patternId2],
      sectionIds: [sectionId1, sectionId2],
    }
  }
};
