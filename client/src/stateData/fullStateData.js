import { initialStateFull, initialStateNormal } from 'stateData/initialState';

export const patternTitles = num => ('pattern title ' + num);
export const patternInfo = '<pattern info placeholder>';
export const patternIds = num => ('patternIdString' + num);
export const sectionIds = num => ('sectionIdString' + num);
export const rowIds = num => ('rowIdString' + num);

export const initialState = initialStateFull;

export const onePattern = {
  ...initialState,
  patterns: {
    ...initialStateNormal,
    byId: {
      [patternIds(1)]: {
        patternId: patternIds(1),
        title: patternTitles(1),
        sectionIds: [],
        info: patternInfo,
      },
    },
    allIds: [patternIds(1)],
  },
};

export const onePatternOneSection = {
  ...onePattern,
  patterns: {
    ...onePattern.patterns,
    byId: {
      [patternIds(1)]: {
        ...onePattern.patterns.byId[patternIds(1)],
        sectionIds: [sectionIds(1)]
      },
    },
  },
  sections: {
    ...initialStateNormal,
    allIds: [sectionIds(1)],
    byId: {
      [sectionIds(1)]: {
        sectionId: sectionIds(1),
        patternId: patternIds(1),
        rowIds: [rowIds(1), rowIds(2)],
      },
    },
  },
  rows: {
    ...initialStateNormal,
    allIds: [rowIds(1), rowIds(2)],
    byId: {
      [rowIds(1)]: {
        rowId: rowIds(1),
        sectionId: sectionIds(1),
      },
      [rowIds(2)]: {
        rowId: rowIds(2),
        sectionId: sectionIds(1),
      },
    },
  },
};

export const onePatternTwoSections = {
  ...onePattern,
  patterns: {
    ...onePattern.patterns,
    byId: {
      [patternIds(1)]: {
        ...onePattern.patterns.byId[patternIds(1)],
        sectionIds: [sectionIds(1), sectionIds(2)]
      },
    },
  },
  sections: {
    ...initialStateNormal,
    allIds: [sectionIds(1), sectionIds(2)],
    byId: {
      [sectionIds(1)]: {
        sectionId: sectionIds(1),
        patternId: patternIds(1),
        rowIds: [rowIds(1), rowIds(2)],
      },
      [sectionIds(2)]: {
        sectionId: sectionIds(2),
        patternId: patternIds(1),
        rowIds: [rowIds(3), rowIds(4)],
      },
    },
  },
  rows: {
    ...initialStateNormal,
    allIds: [rowIds(1), rowIds(2), rowIds(3), rowIds(4)],
    byId: {
      [rowIds(1)]: {
        rowId: rowIds(1),
        sectionId: sectionIds(1),
      },
      [rowIds(2)]: {
        rowId: rowIds(2),
        sectionId: sectionIds(1),
      },
      [rowIds(3)]: {
        rowId: rowIds(3),
        sectionId: sectionIds(2),
      },
      [rowIds(4)]: {
        rowId: rowIds(4),
        sectionId: sectionIds(2),
      },
    },
  },
};

export const twoPatterns = {
  ...onePattern,
  patterns: {
    ...initialStateNormal,
    byId: {
      ...onePattern.patterns.byId,
      [patternIds(2)]: {
        patternId: patternIds(2),
        title: patternTitles(2),
        sectionIds: [],
        info: patternInfo,
      },
    },
    allIds: [patternIds(1), patternIds(2)],
  },
};

export const twoPatternsTwoSections = {
  ...twoPatterns,
  patterns: {
    ...twoPatterns.patterns,
    byId: {
      [patternIds(1)]: {
        ...twoPatterns.patterns.byId[patternIds(1)],
        sectionIds: [sectionIds(1), sectionIds(2)]
      },
      [patternIds(2)]: {
        ...twoPatterns.patterns.byId[patternIds(2)],
        sectionIds: [sectionIds(3), sectionIds(4)]
      },
    },
  },
  sections: {
    ...initialStateNormal,
    allIds: [sectionIds(1), sectionIds(2), sectionIds(3), sectionIds(4)],
    byId: {
      [sectionIds(1)]: {
        sectionId: sectionIds(1),
        patternId: patternIds(1),
        rowIds: [rowIds(1), rowIds(2)],
      },
      [sectionIds(2)]: {
        sectionId: sectionIds(2),
        patternId: patternIds(1),
        rowIds: [rowIds(3), rowIds(4)],
      },
      [sectionIds(3)]: {
        sectionId: sectionIds(3),
        patternId: patternIds(2),
        rowIds: [rowIds(5), rowIds(6)],
      },
      [sectionIds(4)]: {
        sectionId: sectionIds(4),
        patternId: patternIds(2),
        rowIds: [rowIds(7), rowIds(8)],
      },
    },
  },
  rows: {
    ...initialStateNormal,
    allIds: [rowIds(1), rowIds(2), rowIds(3), rowIds(4), rowIds(5), rowIds(6), rowIds(7), rowIds(8)],
    byId: {
      [rowIds(1)]: {
        rowId: rowIds(1),
        sectionId: sectionIds(1),
      },
      [rowIds(2)]: {
        rowId: rowIds(2),
        sectionId: sectionIds(1),
      },
      [rowIds(3)]: {
        rowId: rowIds(3),
        sectionId: sectionIds(2),
      },
      [rowIds(4)]: {
        rowId: rowIds(4),
        sectionId: sectionIds(2),
      },
      [rowIds(5)]: {
        rowId: rowIds(5),
        sectionId: sectionIds(3),
      },
      [rowIds(6)]: {
        rowId: rowIds(6),
        sectionId: sectionIds(3),
      },
      [rowIds(7)]: {
        rowId: rowIds(7),
        sectionId: sectionIds(4),
      },
      [rowIds(8)]: {
        rowId: rowIds(8),
        sectionId: sectionIds(4),
      },
    }
  }
};
