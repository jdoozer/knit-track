import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  fetchSectionIfNeeded, updateRowCount, subscribeRowCount, clearError, updateSection,
} from 'actions';
import { getSectionById, getPatternById } from 'reducers';
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageBlock from 'components/MessageBlock';
import SectionPanel from 'components/SectionPanel';
import SectionForm from 'components/SectionForm';

const mapStateToProps = (state, ownProps) => {
  const { match, sectionId: sectionIdProp } = ownProps;
  const sectionId = sectionIdProp ? sectionIdProp : match.params.sectionId;
  const section = getSectionById(state, sectionId);
  return ({
    section,
    pattern: section ? getPatternById(state, section.patternId) : null,
  })
};

const mapDispatchToProps = {
  updateRowCount,
  subscribeRowCount,
  fetchSectionIfNeeded,
  clearError: sectionId => clearError('sections', sectionId),
  updateSection: (sectionId, sectionUpdates, history) => (
    updateSection(sectionId, sectionUpdates, 'updateSection', history)
  ),
};

const SectionContainer = (props) => {

  const {
    pattern, section, sectionId: sectionIdProp, match, history,
    fetchSectionIfNeeded, updateRowCount, subscribeRowCount, updateSection, clearError,
  } = props;
  const { path, params } = match || {};
  const sectionId = sectionIdProp ? sectionIdProp : params.sectionId;
  const { loading, error, lastActionType } = section || { loading: false, error: null, lastActionType: '' };

  const [initialLoadingIndicator, setInitialLoadingIndicator] = useState(true);
  const [, setSubscribed] = useState(false);

  useEffect(() => { setInitialLoadingIndicator(false) }, []);

  useEffect(() => { fetchSectionIfNeeded(sectionId) }, [fetchSectionIfNeeded, sectionId]);

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


  if (!pattern || ((loading || initialLoadingIndicator) && !lastActionType))
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

  // section is temporarily undefined after a section has been deleted but before we redirect
  if (!section) return null;
  
  // if an invalid section ID entered in URL, redirect to home
  if (!section.sectionId)
    return (<Redirect push to="/" />);

  return (
    <Switch>
      <Route path={`${path}/edit`} render={() => (
        <SectionForm
          onSubmit={sectionUpdates => updateSection(sectionId, sectionUpdates, history)}
          clearError={() => clearError(sectionId)}
          loading={loading && lastActionType === 'updateSection'}
          error={Boolean(error) && lastActionType === 'updateSection'}
          pattern={pattern}
          section={section}
          history={history}
        />
      )} />
      <Route render={() => (<SectionPanel section={section} updateRowCount={updateRowCount} />)} />
    </Switch>
  );
}

SectionContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sectionId: PropTypes.string.isRequired
    }).isRequired,
    path: PropTypes.string.isRequired,
  }),
  section: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      status: PropTypes.number,
      message: PropTypes.string,
    }),
    lastActionType: PropTypes.string.isRequired,
  }),
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  clearError: PropTypes.func.isRequired,
  fetchSectionIfNeeded: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);
