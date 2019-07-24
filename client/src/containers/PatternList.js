import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPattern, fetchPatterns } from 'actions';
import PatternListItems from 'components/PatternListItems';
import { getPatterns, getPatternsLoading, getPatternsError } from 'selectors';

const mapStateToProps = state => ({
  patterns: getPatterns(state),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsError(state))
});

const mapDispatchToProps = {
  onPatternClick: index => selectPattern(index),
  fetchPatterns,
};

class PatternList extends React.Component {

  componentDidMount() {
    this.props.fetchPatterns();
  }

  render() {
    const { patterns, onPatternClick, loading, error } = this.props;
    return (<PatternListItems
      patterns={patterns}
      onPatternClick={onPatternClick}
      loading={loading}
      error={error}
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
  fetchPatterns: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternList);
