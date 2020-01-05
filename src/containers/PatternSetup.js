import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPattern, clearError } from 'actions';
import { getPatternsLoading, getPatternsError } from 'reducers';
import PatternForm from 'components/PatternForm';

const mapStateToProps = state => ({
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsError(state)),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPattern: patternData => dispatch(createPattern(patternData))
    .then(action => (
      action.payload.error
        ? null
        : ownProps.history.push(`/patterns/${action.payload.pattern.patternId}`))
    ),
  clearError: () => dispatch(clearError('patterns')),
});

const PatternSetup = ({ createPattern, clearError, loading, error }) => (
  <PatternForm
    onSubmit={createPattern}
    clearError={clearError}
    loading={loading}
    error={error}
  />
);

PatternSetup.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  createPattern: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatternSetup);
