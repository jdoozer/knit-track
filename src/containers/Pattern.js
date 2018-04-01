import { connect } from 'react-redux';
import { deletePattern, deleteSection } from 'actions';
import PatternContent from 'components/PatternContent';
import { getSelectedPattern, getSelectedPatternSections } from 'selectors';

const mapStateToProps = (state, props) => ({
  pattern: getSelectedPattern(state),
  sections: getSelectedPatternSections(state),
  ...props,
});

const mapDispatchToProps = dispatch => ({
  deletePattern: patternId => {
    dispatch(deletePattern(patternId));
  },
  deleteSection: sectionId => {
    dispatch(deleteSection(sectionId));
  },
});

const Pattern = connect(mapStateToProps, mapDispatchToProps)(PatternContent);

export default Pattern;
