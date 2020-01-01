import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  fetchPatternExpandedIfNeeded, clearError, updatePattern
} from 'actions';
import {
  getPatternLoading, getPatternError, getPatternLastAction, getPatternById
} from 'reducers';
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageBlock from 'components/MessageBlock';
import Pattern from 'components/Pattern';
import PatternForm from 'components/PatternForm';
import SectionSetup from 'containers/SectionSetup';

const mapStateToProps = (state, { match: { params: { patternId }}}) => ({
  loading: getPatternLoading(state, patternId),
  error: getPatternError(state, patternId),
  lastActionType: getPatternLastAction(state, patternId),
  pattern: getPatternById(state, patternId),
});

const mapDispatchToProps = {
  fetchPatternExpandedIfNeeded: patternId => (
    fetchPatternExpandedIfNeeded(patternId)
  ),
  clearError: patternId => clearError('patterns', patternId),
  updatePattern: ({ patternId, ...patternUpdates }) => (
    updatePattern(patternId, patternUpdates, 'updatePattern')
  )
};

class PatternContainer extends React.Component {

  state = { initialLoadingIndicator: true};

  componentDidMount() {
    const patternId = this.props.match.params.patternId;

    if (patternId) {
      this.props.fetchPatternExpandedIfNeeded(patternId);
    }

    this.setState({ initialLoadingIndicator: false });
  }

  componentDidUpdate(prevProps) {
    const patternId = this.props.match.params.patternId;
    const prevPatternId = prevProps.match.params.patternId;

    if (patternId && prevPatternId && (patternId !== prevPatternId)) {
      this.props.fetchPatternExpandedIfNeeded(patternId);
    }
  }

  render() {

    const {
      match: { path }, history, pattern,
      loading, error, lastActionType, clearError, updatePattern
    } = this.props;

    if ((loading || this.state.initialLoadingIndicator) && !lastActionType) {
      return (
        <CircularProgress />
      );
    }

    if (error && !lastActionType) {
      if (error.status === 404)
        return (<MessageBlock>Pattern ID is invalid</MessageBlock>);
      return (
        <MessageBlock>
          An error occurred while fetching data. Please reload to try again.
        </MessageBlock>
      );
    }

    if (!pattern)
      return (<Redirect push to="/home" />);

    return (
      <Switch>
        <Route path={`${path}/newsection`} component={SectionSetup} />
        <Route path={`${path}/edit`} render={() => (
          <PatternForm
            onSubmit={updatePattern}
            clearError={clearError}
            loading={loading && lastActionType === 'updatePattern'}
            error={Boolean(error) && lastActionType === 'updatePattern'}
            pattern={pattern}
            history={history}
          />
        )} />
        <Route render={() => (<Pattern pattern={pattern} />)} />
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
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  lastActionType: PropTypes.string.isRequired,
  pattern: PropTypes.object,
  fetchPatternExpandedIfNeeded: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatternContainer);
