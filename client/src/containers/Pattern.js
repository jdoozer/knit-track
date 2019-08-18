import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deletePattern,
  deleteSection,
  fetchPatternExpandedIfNeeded
} from 'actions';
import {
  getPatternsLoading,
  getPatternsErrorMsg,
  getPatternsErrorCode,
  getPatternById,
  getSectionsById
} from 'selectors';
import CircularProgress from '@material-ui/core/CircularProgress';
import PatternContent from 'components/PatternContent';
import MessageBlock from 'components/MessageBlock';

const mapStateToProps = state => ({
  patternById: patternId => getPatternById(state, patternId),
  getSectionsFromIds: getSectionsById(state),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsErrorMsg(state)),
  errorCode: getPatternsErrorCode(state),
});

const mapDispatchToProps = {
  deletePattern: patternId => deletePattern(patternId),
  deleteSection: sectionId => deleteSection(sectionId),
  fetchPatternExpandedIfNeeded: patternId => (
    fetchPatternExpandedIfNeeded(patternId)
  ),
};

class Pattern extends React.Component {

  state = { initialLoadingIndicator: true};

  componentDidMount() {

    const { match, fetchPatternExpandedIfNeeded, error } = this.props;
    const patternId = match.params.patternId;

    if (patternId && !error) {
      fetchPatternExpandedIfNeeded(patternId);
    }

    this.setState({ initialLoadingIndicator: false });

  }

  render() {
    const {
      match,
      loading,
      error,
      errorCode,
      patternById,
      getSectionsFromIds,
      deletePattern,
      deleteSection
    } = this.props;

    if (loading || this.state.initialLoadingIndicator) {
      return (
        <CircularProgress />
      );
    }
    if (error) {
      if (errorCode === 404) {
        return (<MessageBlock>Pattern ID is invalid</MessageBlock>);
      }
      return (
        <MessageBlock>
          An error occurred while fetching data. Please reload to try again.
        </MessageBlock>
      );
    }

    const pattern = patternById(match.params.patternId);
    const sections = getSectionsFromIds(pattern.sectionIds);

    return (
      <PatternContent
        pattern={pattern}
        sections={sections}
        deletePattern={deletePattern}
        deleteSection={deleteSection}
      />
    );
  }

}

Pattern.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      patternId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  // pattern: PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   info: PropTypes.string.isRequired,
  //   patternId: PropTypes.string.isRequired,
  //   sectionIds: PropTypes.array.isRequired,
  // }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorCode: PropTypes.number,
  deletePattern: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  fetchPatternExpandedIfNeeded: PropTypes.func.isRequired,
  getSectionsFromIds: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
