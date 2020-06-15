import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSection, clearError } from 'actions';
import { getPatternById, getSectionsLoading, getSectionsError } from 'reducers';
import SectionForm from 'components/SectionForm';

const mapStateToProps = (state, ownProps) => ({
  pattern: getPatternById(state, ownProps.match.params.patternId),
  loading: getSectionsLoading(state),
  error: Boolean(getSectionsError(state)),
});

const mapDispatchToProps = {
  createSection,
  clearError: () => clearError('sections'),
};

const SectionSetup = ({
  pattern, createSection, loading, error, clearError, history,
}) => (
  <SectionForm
    pattern={pattern}
    onSubmit={sectionData => createSection({ history, sectionData })}
    clearError={clearError}
    loading={loading}
    error={error}
  />
);

SectionSetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      patternId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  pattern: PropTypes.object.isRequired,
  createSection: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionSetup);
