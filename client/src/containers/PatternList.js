import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPatterns } from 'actions';
import PatternListItems from 'components/PatternListItems';
import { getPatterns, getPatternsLoading, getPatternsErrorMsg } from 'reducers';

const mapStateToProps = state => ({
  patterns: getPatterns(state),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsErrorMsg(state))
});

const mapDispatchToProps = {
  fetchPatterns,
};

class PatternList extends React.Component {

  componentDidMount() {
    this.props.fetchPatterns();
  }

  render() {
    const { fetchPatterns, ...otherProps } = this.props;
    return (<PatternListItems {...otherProps} />);
  }

}

PatternList.propTypes = {
  patterns: PropTypes.arrayOf(
    PropTypes.shape({
      patternId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  fetchPatterns: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternList);
