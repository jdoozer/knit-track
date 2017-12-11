import { connect } from 'react-redux';
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

const PatternContainer = connect(mapStateToProps)(Pattern);

export default PatternContainer;
