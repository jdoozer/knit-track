import deleteItems from 'utils/deleteItems';
import deleteFromState from 'utils/deleteFromState';

export function deleteSection(state, sectionId) {

  const { patterns, sections, rows } = state;

  const rowIds = sections.byId[sectionId].rowIds;
  const patternId = sections.byId[sectionId].patternId;
  const pattern = patterns.byId[patternId];

  return {
    ...state,
    patterns: {
      byId: {
        ...patterns.byId,
        [patternId]: {
          ...pattern,
          sectionIds: deleteItems(pattern.sectionIds, sectionId),
        }
      },
      allIds: patterns.allIds,
    },
    rows: deleteFromState(rows, rowIds),
    sections: deleteFromState(sections, sectionId),
  };
};

export function deletePattern(state, patternId) {

  const { patterns, sections, rows } = state;

  const sectionIds = patterns.byId[patternId].sectionIds;

  const rowIds = sectionIds.reduce(
    (rowIds, sectionId) => rowIds.concat(sections.byId[sectionId].rowIds),
    []
  );

  return {
    ...state,
    patterns: deleteFromState(patterns, patternId),
    sections: deleteFromState(sections, sectionIds),
    rows: deleteFromState(rows, rowIds),
  };
};
