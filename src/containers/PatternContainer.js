import { connect } from 'react-redux';
import { deletePattern } from 'actions';
import Pattern from 'components/Pattern';

const mapStateToProps = state => {
  const selectedId = state.patterns.selected;

  if (selectedId != null) {
    const pattern = state.patterns.byId[selectedId];
    const sections = pattern.sections.map(
      sectionId => state.sections.byId[sectionId]
    );

    return { pattern, sections };

  } else {
    return {
      pattern: null,
      sections: []
    };
  }
};

const mapDispatchToProps = dispatch => ({
  deletePattern: patternId => {
    dispatch(deletePattern(patternId));
  },
});

// const PatternContainer = connect(mapStateToProps)(Pattern);
const PatternContainer = connect(mapStateToProps, mapDispatchToProps)(Pattern);

export default PatternContainer;
