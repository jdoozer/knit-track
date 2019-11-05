import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { fetchPatternExpandedIfNeeded } from 'actions';
import {
  getPatternLoading, getPatternError, getPatternLastAction, getPatternById
} from 'reducers';
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageBlock from 'components/MessageBlock';
import Pattern from 'components/Pattern';
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
      match: { path }, pattern,
      loading, error, lastActionType
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

    return (
      <Switch>
        <Route path={`${path}/newsection`} component={SectionSetup} />
        <Route render={() => (
          (pattern === undefined)
            ? (<Redirect push to="/patterns" />)
            : (<Pattern pattern={pattern} />)
        )} />
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
  error: PropTypes.object,
  lastActionType: PropTypes.string.isRequired,
  pattern: PropTypes.object,
  fetchPatternExpandedIfNeeded: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatternContainer);
