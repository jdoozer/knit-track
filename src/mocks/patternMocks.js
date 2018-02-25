
export const patternTitle1 = 'pattern title';
export const patternTitle2 = 'pattern title 2';
export const patternId1 = 'patternIdString';
export const patternId2 = 'patternIdString2';
export const patternInfo = '<pattern info placeholder>';
export const sectionId1 = 'sectionIdString';
export const sectionId2 = 'sectionIdString2';


export const initialStatePatterns = {
  byId: {},
  allIds: [],
  selected: null,
};

export const onePattern = {
  byId: {
    [patternId1]: {
      patternId: patternId1,
      title: patternTitle1,
      sectionIds: [],
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
      sectionIds: [],
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

export const twoPatternsSecondSelectedOneSection = {
  ...twoPatternsSecondSelected,
  byId: {
    ...twoPatternsSecondSelected.byId,
    [patternId2]: {
      ...twoPatternsSecondSelected.byId[patternId2],
      sectionIds: [sectionId1],
    }
  }
};

export const twoPatternsSecondSelectedTwoSections = {
  ...twoPatternsSecondSelected,
  byId: {
    ...twoPatternsSecondSelected.byId,
    [patternId2]: {
      ...twoPatternsSecondSelected.byId[patternId2],
      sectionIds: [sectionId1, sectionId2],
    }
  }
};
