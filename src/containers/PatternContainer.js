import { connect } from 'react-redux';
import { deletePattern, deleteSection, deleteRow } from 'actions';
import Pattern from 'components/Pattern';

const mapStateToProps = state => {
  const selectedId = state.patterns.selected;

  if (selectedId != null) {
    const pattern = state.patterns.byId[selectedId];
    const sections = pattern.sections.map(
      sectionId => state.sections.byId[sectionId]
    );

    const rowIds = sections.reduce(
      (rows, section) => {
        rows.push(...section.rows);
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
    dispatch(deleteSection(sectionIds));
    dispatch(deleteRow(rowIds));
  },
});

const PatternContainer = connect(mapStateToProps, mapDispatchToProps)(Pattern);

export default PatternContainer;
