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

const mapDispatchToProps = {
  createPattern,
  clearError: () => clearError('patterns'),
};

const PatternSetup = ({ createPattern, clearError, loading, error, history }) => (
  <PatternForm
    onSubmit={patternData => createPattern({ history, patternData, actionType: 'createPattern' })}
    clearError={clearError}
    loading={loading}
    error={error}
    createNew
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
