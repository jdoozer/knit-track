
export const title1 = 'section title';
export const title2 = 'section title 2';
export const patternId = 'patternIdString';
export const sectionId1 = 'sectionIdString';
export const sectionId2 = 'sectionIdString2';
export const rowId1 = 'rowIdString1';
export const rowId2 = 'rowIdString2';
export const numRows = 12;

export const initialState = {
  byId: {},
  allIds: [],
  sectionToEdit: null,
};

export const oneSection = {
  byId: {
    [sectionId1]: {
      sectionId: sectionId1,
      pattern: patternId,
      title: title1,
      rows: [],
      numRows,
      currentRow: 0
    },
  },
  allIds: [sectionId1],
  sectionToEdit: sectionId1,
};

export const oneSectionRows = (rowCount) => ({
  byId: {
    [sectionId1]: {
      sectionId: sectionId1,
      pattern: patternId,
      title: title1,
      rows: [],
      numRows,
      currentRow: rowCount,
    },
  },
  allIds: [sectionId1],
  sectionToEdit: null,
});

export const twoSections = {
  byId: {
    ...oneSection.byId,
    [sectionId2]: {
      sectionId: sectionId2,
      pattern: patternId,
      title: title2,
      rows: [],
      numRows,
      currentRow: 0
    },
  },
  allIds: [sectionId1, sectionId2],
  sectionToEdit: sectionId2,
};

export const twoSectionsOneRow = {
  ...twoSections,
  byId: {
    ...twoSections.byId,
    [sectionId1]: {
      ...twoSections.byId[sectionId1],
      rows: [rowId1],
    },
  },
};


export const twoSectionsTwoRows = {
  ...twoSections,
  byId: {
    ...twoSections.byId,
    [sectionId1]: {
      ...twoSections.byId[sectionId1],
      rows: [rowId1, rowId2],
    },
  },
};

export const twoSectionsOneRowEach = {
  ...twoSections,
  byId: {
    [sectionId1]: {
      ...twoSections.byId[sectionId1],
      rows: [rowId1],
    },
    [sectionId2]: {
      ...twoSections.byId[sectionId2],
      rows: [rowId2],
    },
  },
};


/*
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
      sections: [sectionId1],
    }
  }
};

export const twoPatternsSecondSelectedTwoSections = {
  ...twoPatternsSecondSelected,
  byId: {
    ...twoPatternsSecondSelected.byId,
    [patternId2]: {
      ...twoPatternsSecondSelected.byId[patternId2],
      sections: [sectionId1, sectionId2],
    }
  }
};
*/
