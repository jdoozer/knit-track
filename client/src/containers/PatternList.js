import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPattern, fetchPatternsIfNeeded } from 'actions';
import PatternListItems from 'components/PatternListItems';
import { getPatterns, getPatternLoading } from 'selectors';

const mapStateToProps = state => ({
  patterns: getPatterns(state),
  loading: getPatternLoading(state),
});

const mapDispatchToProps = {
  onPatternClick: index => selectPattern(index),
  fetchPatternsIfNeeded,
};

class PatternList extends React.Component {

  componentDidMount() {
    this.props.fetchPatternsIfNeeded();
  }

  render() {
    const { patterns, onPatternClick, loading } = this.props;
    return (<PatternListItems
      patterns={patterns}
      onPatternClick={onPatternClick}
      loading={loading}
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
  loading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternList);
