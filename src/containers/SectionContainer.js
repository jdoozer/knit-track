import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { fetchSectionIfNeeded, /* clearError, updatePattern */ } from 'actions';
import { getSectionLastAction, getSectionLoading, getSectionError } from 'reducers';
import { updateRowCount, subscribeRowCount } from 'actions';
import { getSectionById } from 'reducers';
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageBlock from 'components/MessageBlock';
import SectionPanel from 'components/SectionPanel';

const mapStateToProps = (state, ownProps) => {
  const { match, sectionId: sectionIdProp } = ownProps;
  const sectionId = sectionIdProp ? sectionIdProp : match.params.sectionId;
  return ({
    section: getSectionById(state, sectionId),
    loading: getSectionLoading(state, sectionId),
    error: Boolean(getSectionError(state, sectionId)),
    lastActionType: getSectionLastAction(state, sectionId),
  })
};

const mapDispatchToProps = {
  updateRowCount,
  subscribeRowCount,
  fetchSectionIfNeeded,
};
    // clearError: () => dispatch(clearError('sections', sectionId)),
    // updatePattern: patternUpdates => (
    //   dispatch(updatePattern(patternId, patternUpdates, 'updatePattern'))
    //   .then(action => (
    //     (action && action.payload.error) ? null : history.push('.')
    //   ))
    // ),


const SectionContainer = (props) => {

  const {
    section, sectionId: sectionIdProp, match, loading, error, lastActionType,
    fetchSectionIfNeeded, updateRowCount, subscribeRowCount
  } = props;
  const sectionId = sectionIdProp ? sectionIdProp : match.params.sectionId;

  const [initialLoadingIndicator, setInitialLoadingIndicator] = useState(true);
  const [, setSubscribed] = useState(false);

  useEffect(() => {
    setInitialLoadingIndicator(false);
  }, []);

  useEffect(() => {
    fetchSectionIfNeeded(sectionId)
  }, [fetchSectionIfNeeded, sectionId]);

  useEffect(() => {
    setSubscribed(subscribed => {
      if (sectionId && !subscribed)
        subscribeRowCount(sectionId, true);
      return (sectionId && !subscribed);
    });
    return (() => {
      setSubscribed(subscribed => {
        if (subscribed)
          subscribeRowCount(sectionId, false);
        return false;
      });
    });
  }, [sectionId, subscribeRowCount]);



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

  if (!section)
    return (<Redirect push to="/" />);

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
      <Route render={() => (<SectionPanel section={section} updateRowCount={updateRowCount} />)} />
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
