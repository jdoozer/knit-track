import { connect } from 'react-redux';
import { selectPattern } from 'actions';
import PatternList from 'components/PatternList';

const mapStateToProps = state => {
  return {
    patterns: state.patterns.allIDs.map(patternID =>
      state.patterns.byID[patternID]
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPatternClick: index => {
      dispatch(selectPattern(index));
    }
  }
};

const PatternListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatternList);

export default PatternListContainer;
