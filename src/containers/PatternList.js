import { connect } from 'react-redux';
import { selectPattern } from 'actions';
import PatternListItems from 'components/PatternListItems';

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

const PatternList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatternListItems);

export default PatternList;
