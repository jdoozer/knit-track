import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSection, clearLastCreated, clearError } from 'actions';
import {
  getPatternById,
  getPatternIdLastCreatedSection,
  getSectionsLoading,
  getSectionsError
} from 'reducers';
import SectionSetupForm from 'components/SectionSetupForm';

const mapStateToProps = (state, ownProps) => ({
  pattern: getPatternById(state, ownProps.match.params.patternId),
  patternIdLastCreatedSection: getPatternIdLastCreatedSection(state),
  loading: getSectionsLoading(state),
  error: Boolean(getSectionsError(state)),
});

const mapDispatchToProps = {
  createSection: section => createSection(section),
  clearError: () => clearError(['sections']),
  clearLastCreated: () => clearLastCreated(['sections']),
};


class SectionSetup extends React.Component {

  componentDidUpdate() {
    const { patternIdLastCreatedSection, history } = this.props;
    if (patternIdLastCreatedSection) {
      history.push(`/patterns/${patternIdLastCreatedSection}`);
    }
  }

  componentWillUnmount() {
    this.props.clearLastCreated();
  }

  render() {
    const { pattern, createSection, loading, error, clearError } = this.props;

    return (
      <SectionSetupForm
        pattern={pattern}
        createSection={createSection}
        clearError={clearError}
        loading={loading}
        error={error}
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  pattern: PropTypes.object.isRequired,
  createSection: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  clearLastCreated: PropTypes.func.isRequired,
  patternIdLastCreatedSection: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionSetup);
