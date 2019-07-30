import { initialStateNormal } from 'stateData/initialState';

export const title1 = 'section title';
export const title2 = 'section title 2';
export const patternId = 'patternIdString';
export const sectionId1 = 'sectionIdString';
export const sectionId2 = 'sectionIdString2';
export const rowId1 = 'rowIdString1';
export const rowId2 = 'rowIdString2';
export const numRows = 12;

export const initialState = initialStateNormal;

export const oneSection = {
  ...initialState,
  byId: {
    [sectionId1]: {
      sectionId: sectionId1,
      patternId,
      title: title1,
      rowIds: [],
      numRows,
      currentRow: 1
    },
  },
  allIds: [sectionId1],
};

export const oneSectionRows = (rowCount) => ({
  ...initialState,
  byId: {
    [sectionId1]: {
      sectionId: sectionId1,
      patternId,
      title: title1,
      rowIds: [],
      numRows,
      currentRow: rowCount,
    },
  },
  allIds: [sectionId1],
});

export const twoSections = {
  ...initialState,
  byId: {
    ...oneSection.byId,
    [sectionId2]: {
      sectionId: sectionId2,
      patternId,
      title: title2,
      rowIds: [],
      numRows,
      currentRow: 1
    },
  },
  allIds: [sectionId1, sectionId2],
};

export const twoSectionsOneRow = {
  ...twoSections,
  byId: {
    ...twoSections.byId,
    [sectionId1]: {
      ...twoSections.byId[sectionId1],
      rowIds: [rowId1],
    },
  },
};


export const twoSectionsTwoRows = {
  ...twoSections,
  byId: {
    ...twoSections.byId,
    [sectionId1]: {
      ...twoSections.byId[sectionId1],
      rowIds: [rowId1, rowId2],
    },
  },
};

export const twoSectionsOneRowEach = {
  ...twoSections,
  byId: {
    [sectionId1]: {
      ...twoSections.byId[sectionId1],
      rowIds: [rowId1],
    },
    [sectionId2]: {
      ...twoSections.byId[sectionId2],
      rowIds: [rowId2],
    },
  },
};
