import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { fetchSectionIfNeeded, /* clearError, updatePattern */ } from 'actions';
import { getSectionLastAction, getSectionLoading, getSectionError } from 'reducers';
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageBlock from 'components/MessageBlock';
import Section from 'containers/Section';

const mapStateToProps = (state, ownProps) => {
  const sectionId = ownProps.match.params.sectionId;
  return ({
    loading: getSectionLoading(state, sectionId),
    error: Boolean(getSectionError(state, sectionId)),
    lastActionType: getSectionLastAction(state, sectionId),
  })
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // const sectionId = ownProps.match.params.sectionId;
  return ({
    fetchSectionIfNeeded: (sectionId) => dispatch(
      fetchSectionIfNeeded(sectionId)
    ),
    // clearError: () => dispatch(clearError('sections', sectionId)),
    // updatePattern: patternUpdates => (
    //   dispatch(updatePattern(patternId, patternUpdates, 'updatePattern'))
    //   .then(action => (
    //     (action && action.payload.error) ? null : history.push('.')
    //   ))
    // ),
  });
};

const SectionContainer = ({
  match, loading, error, lastActionType, fetchSectionIfNeeded,
}) => {
  const [initialLoadingIndicator, setInitialLoadingIndicator] = useState(true);
  const sectionId = match.params.sectionId;

  useEffect(() => {
    setInitialLoadingIndicator(false);
  }, []);

  useEffect(() => {
    fetchSectionIfNeeded(sectionId)
  }, [fetchSectionIfNeeded, sectionId]);

  if ((loading || initialLoadingIndicator) && !lastActionType)
    return (<CircularProgress />);

  if (error && !lastActionType) {
    if (error.status === 404)
      return (<MessageBlock>Section ID is invalid</MessageBlock>);
    return (
      <MessageBlock>
        An error occurred while fetching data. Please reload to try again.
      </MessageBlock>
    );
  }

  // if (!section)
  //   return (<Redirect push to="/home" />);

  return (
    <Switch>
  {/*     <Route path={`${path}/newsection`} component={SectionSetup} />
      <Route path={`${path}/edit`} render={() => (
        <PatternForm
          onSubmit={updatePattern}
          clearError={clearError}
          loading={loading && lastActionType === 'updatePattern'}
          error={Boolean(error) && lastActionType === 'updatePattern'}
          pattern={pattern}
          history={history}
        />
      )} /> */}
      <Route render={() => (<Section sectionId={sectionId} />)} />
    </Switch>
  );
}

SectionContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sectionId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  // createSection: PropTypes.func.isRequired,
  // clearError: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  lastActionType: PropTypes.string.isRequired,
  fetchSectionIfNeeded: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);
