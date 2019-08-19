import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { fetchPatternExpandedIfNeeded } from 'actions';
import {
  getPatternsLoading, getPatternsErrorMsg, getPatternsErrorCode
} from 'selectors';
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageBlock from 'components/MessageBlock';
import Pattern from 'containers/Pattern';
import SectionSetup from 'containers/SectionSetup';

const mapStateToProps = state => ({
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsErrorMsg(state)),
  errorCode: getPatternsErrorCode(state),
});

const mapDispatchToProps = {
  fetchPatternExpandedIfNeeded: patternId => (
    fetchPatternExpandedIfNeeded(patternId)
  ),
};

class PatternContainer extends React.Component {

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

    const { match, loading, error, errorCode } = this.props;

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

    return (
      <Switch>
        <Route path={`${match.path}/newsection`} component={SectionSetup} />
        <Route component={Pattern} />
      </Switch>
    );
  }

}

PatternContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      patternId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorCode: PropTypes.number,
  fetchPatternExpandedIfNeeded: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatternContainer);
