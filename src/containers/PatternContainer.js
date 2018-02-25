import { connect } from 'react-redux';
import { deletePattern, deleteSection, deleteRow } from 'actions';
import Pattern from 'components/Pattern';

const mapStateToProps = state => {
  const selectedId = state.patterns.selected;

  if (selectedId != null) {
    const pattern = state.patterns.byId[selectedId];
    const sections = pattern.sectionIds.map(
      sectionId => state.sections.byId[sectionId]
    );

    const rowIds = sections.reduce(
      (rows, section) => {
        rows.push(...section.rowIds);
        return rows;
      }, []);

    return { pattern, sections, rowIds };
  }
  return {
    pattern: null,
    sections: [],
    rowIds: [],
  };
};

const mapDispatchToProps = dispatch => ({
  deletePattern: (patternId, sectionIds, rowIds) => {
    dispatch(deletePattern(patternId));
    dispatch(deleteSection(patternId, sectionIds));
    dispatch(deleteRow(rowIds));
  },
  deleteSection: (patternId, sectionId, rowIds) => {
    dispatch(deleteSection(patternId, sectionId));
    dispatch(deleteRow(rowIds));
  }
});

const PatternContainer = connect(mapStateToProps, mapDispatchToProps)(Pattern);

export default PatternContainer;
