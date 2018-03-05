import { connect } from 'react-redux';
import { deletePattern, deleteSection, deleteRow } from 'actions';
import Pattern from 'components/Pattern';

const mapStateToProps = (state, ownProps) => {

  const selectedId = state.ui.selectedPattern;

  if (selectedId == null) {
    return { pattern: null, sections: [], ...ownProps };
  }

  const pattern = state.patterns.byId[selectedId];
  const sections = pattern.sectionIds.map(
    sectionId => state.sections.byId[sectionId]
  );

  return { pattern, sections, ...ownProps };

};

const mapDispatchToProps = dispatch => ({
  deletePattern: patternId => {
    dispatch(deletePattern(patternId));
  },
  deleteSection: sectionId => {
    dispatch(deleteSection(sectionId));
  }
});

const PatternContainer = connect(mapStateToProps, mapDispatchToProps)(Pattern);

export default PatternContainer;
