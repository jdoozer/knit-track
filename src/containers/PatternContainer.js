import { connect } from 'react-redux';
import { updateCount } from 'actions';
import Pattern from 'components/Pattern';

const mapStateToProps = state => {
  if (state.selectedPattern != null) {
    return { pattern: state.patterns[state.selectedPattern] };
  } else {
    return {
      pattern: null
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIncClick: index => {
      dispatch(updateCount(index, 'INCREASE'));
    }
  }
};


const PatternContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pattern);

export default PatternContainer;
