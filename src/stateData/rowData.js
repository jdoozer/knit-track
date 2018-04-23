import { initialStateNormal } from 'stateData/initialState';

export const sectionId1 = 'sectionIdString1';
export const sectionId2 = 'sectionIdString2';
export const rowId1 = 'rowIdString1';
export const rowId2 = 'rowIdString2';
export const rowId3 = 'rowIdString3';

export const initialState = initialStateNormal;

export const oneRow = {
  byId: {
    [rowId1]: {
      sectionId: sectionId1,
      rowId: rowId1,
      dummyInfo: 'dummy info',
    },
  },
  allIds: [rowId1],
};

export const twoRows = {
  byId: {
    [rowId1]: {
      sectionId: sectionId1,
      rowId: rowId1,
      dummyInfo: 'dummy info',
    },
    [rowId2]: {
      sectionId: sectionId1,
      rowId: rowId2,
      dummyInfo: 'dummy info',
    },
  },
  allIds: [rowId1, rowId2],
};

export const threeRows = {
  byId: {
    [rowId1]: {
      sectionId: sectionId1,
      rowId: rowId1,
      dummyInfo: 'dummy info',
    },
    [rowId2]: {
      sectionId: sectionId1,
      rowId: rowId2,
      dummyInfo: 'dummy info',
    },
    [rowId3]: {
      sectionId: sectionId2,
      rowId: rowId3,
      dummyInfo: 'dummy info',
    },
  },
  allIds: [rowId1, rowId2, rowId3],
};
