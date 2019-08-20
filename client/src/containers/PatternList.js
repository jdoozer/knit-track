import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPatterns } from 'actions';
import { getPatternTitlesSorted, getPatternsLoading, getPatternsErrorMsg } from 'reducers';
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageBlock from 'components/MessageBlock';
import PatternListItems from 'components/PatternListItems';

const mapStateToProps = state => ({
  patternTitles: getPatternTitlesSorted(state),
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

    const { loading, error, patternTitles } = this.props;

    if (loading) {
      return (<CircularProgress />);
    }

    if (error) {
      return (
        <MessageBlock>
          An error occurred while fetching data. Please reload to try again.
        </MessageBlock>
      );
    }

    if (patternTitles.length) {
      return (<PatternListItems patternTitles={patternTitles} />);
    }

    return (
      <MessageBlock>
         No patterns created yet! Click the button below to add a new pattern.
      </MessageBlock>
    );
  }
}

PatternList.propTypes = {
  patternTitles: PropTypes.arrayOf(
    PropTypes.shape({
      patternId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  fetchPatterns: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PatternList);
