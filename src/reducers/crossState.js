import deleteKeys from 'utils/deleteKeys';


const patternsById = (state, payload) => {
  const { patternId, sectionIds } = payload;
  const pattern = state[patternId];

  if (!pattern.sections) return state;

  const updatedSections = pattern.sections.filter(
    sectId => !sectionIds.includes(sectId)
  );

  return {
    ...state,
    [patternId]: {
      ...pattern,
      sections: updatedSections,
    },
  };
};


export function deleteSection(state, payload) {

  const { patterns, sections, rows } = state;
  const { patternId, sectionIds } = payload;

  return {
    patterns: {
      ...patterns,
      byId: patternsById(patterns.byId, payload),
    },
    sections: {
      byId: deleteKeys(sections.byId, sectionIds),
      allIds: sections.allIds.filter(sectionId => !sectionIds.includes(sectionId)),
      sectionToEdit: (sectionIds.includes(sections.sectionToEdit) ? null : sections.sectionToEdit),
    },
    rows,
  };
}
