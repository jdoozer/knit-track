import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSection, fetchPatternExpandedIfNeeded } from 'actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageBlock from 'components/MessageBlock';
import SectionSetupForm from 'components/SectionSetupForm';
import {
  getPatternsLoading,
  getPatternsErrorMsg,
  getPatternsErrorCode,
  getPatternById,
} from 'selectors';

const mapStateToProps = state => ({
  patternById: patternId => getPatternById(state, patternId),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsErrorMsg(state)),
  errorCode: getPatternsErrorCode(state),
});

const mapDispatchToProps = {
  createSection: section => createSection(section),
  fetchPatternExpandedIfNeeded: patternId => fetchPatternExpandedIfNeeded(patternId),
};

class SectionSetup extends React.Component {

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
      history,
      loading,
      error,
      errorCode,
      patternById,
      createSection
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

    return (
      <SectionSetupForm
        pattern={pattern}
        createSection={createSection}
        history={history}
      />
    );
  }
}

SectionSetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      patternId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorCode: PropTypes.number,
  createSection: PropTypes.func.isRequired,
  fetchPatternExpandedIfNeeded: PropTypes.func.isRequired,

}

export default connect(mapStateToProps, mapDispatchToProps)(SectionSetup);
