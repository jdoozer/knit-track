import { connect } from 'react-redux';
import { selectPattern } from 'actions';
import PatternList from 'components/PatternList';

const mapStateToProps = state => {
  return {
    patterns: state.patterns.allIds.map(patternId =>
      state.patterns.byId[patternId]
    )
  };
};

const mapDispatchToProps = dispatch => ({
  onPatternClick: index => {
    dispatch(selectPattern(index));
  },
});

const PatternListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatternList);

export default PatternListContainer;
