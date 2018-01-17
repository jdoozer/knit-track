import { connect } from 'react-redux';
import { deletePattern } from 'actions';
import Pattern from 'components/Pattern';

const mapStateToProps = state => {
  const selectedID = state.patterns.selected;

  if (selectedID != null) {
    const pattern = state.patterns.byID[selectedID];
    const sections = pattern.sections.map(
      sectionID => state.sections.byID[sectionID]
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
  deletePattern: patternID => {
    dispatch(deletePattern(patternID));
  },
});

// const PatternContainer = connect(mapStateToProps)(Pattern);
const PatternContainer = connect(mapStateToProps, mapDispatchToProps)(Pattern);

export default PatternContainer;
