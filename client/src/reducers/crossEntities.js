import deleteItems from 'utils/deleteItems';
import deleteFromState from 'utils/deleteFromState';

export function deleteSection(state, sectionId) {

  const { patterns, sections } = state;

  const patternId = sections.byId[sectionId].patternId;
  const pattern = patterns.byId[patternId];

  return {
    ...state,
    patterns: {
      ...patterns,
      byId: {
        ...patterns.byId,
        [patternId]: {
          ...pattern,
          sectionIds: deleteItems(pattern.sectionIds, sectionId),
        }
      },
      allIds: patterns.allIds,
    },
    sections: deleteFromState(sections, sectionId),
  };
};

export function deletePattern(state, patternId) {

  const { patterns, sections } = state;

  const sectionIds = patterns.byId[patternId].sectionIds;

  return {
    ...state,
    patterns: deleteFromState(patterns, patternId),
    sections: deleteFromState(sections, sectionIds),
  };
};
