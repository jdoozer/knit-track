import { connect } from 'react-redux';
import { selectPattern } from 'actions';
import PatternListItems from 'components/PatternListItems';
import { getPatterns } from 'selectors';

const mapStateToProps = state => ({
  patterns: getPatterns(state),
});

const mapDispatchToProps = dispatch => ({
  onPatternClick: index => {
    dispatch(selectPattern(index));
  },
});

const PatternList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatternListItems);

export default PatternList;
