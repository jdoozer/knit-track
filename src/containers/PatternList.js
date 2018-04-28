import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPattern, fetchPatternsIfNeeded } from 'actions';
import PatternListItems from 'components/PatternListItems';
import { getPatterns } from 'selectors';

const mapStateToProps = state => ({
  patterns: getPatterns(state),
  isFetching: state.patterns.isFetching,
});

const mapDispatchToProps = dispatch => ({
  onPatternClick: index => {
    dispatch(selectPattern(index));
  },
  fetchPatternsIfNeeded: () => {
    dispatch(fetchPatternsIfNeeded());
  },
});

class PatternList extends React.Component {

  componentDidMount() {
    this.props.fetchPatternsIfNeeded();
  }

  render() {
    const { patterns, onPatternClick, isFetching } = this.props;
    return (<PatternListItems
      patterns={patterns}
      onPatternClick={onPatternClick}
      isFetching={isFetching}
    />);
  }

}

PatternList.propTypes = {
  patterns: PropTypes.arrayOf(
    PropTypes.shape({
      patternId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onPatternClick: PropTypes.func.isRequired,
  fetchPatternsIfNeeded: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternList);
