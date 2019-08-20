import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSection } from 'actions';
import SectionSetupForm from 'components/SectionSetupForm';
import { getPatternById } from 'reducers';

const mapStateToProps = state => ({
  patternById: patternId => getPatternById(state, patternId),
});

const mapDispatchToProps = {
  createSection: section => createSection(section),
};

const SectionSetup = ({
  match,
  history,
  patternById,
  createSection
}) => (
  <SectionSetupForm
    pattern={patternById(match.params.patternId)}
    createSection={createSection}
    history={history}
  />
);

SectionSetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      patternId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  createSection: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionSetup);
