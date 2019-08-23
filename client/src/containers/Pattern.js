import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deletePattern, deleteSection, updateRowCount, clearError
} from 'actions';
import { getPatternById, getSectionsById } from 'reducers';
import PatternContent from 'components/PatternContent';

const mapStateToProps = state => ({
  patternById: patternId => getPatternById(state, patternId),
  getSectionsFromIds: sectionIds => getSectionsById(state, sectionIds),
});

const mapDispatchToProps = {
  deletePattern: patternId => deletePattern(patternId),
  deleteSection: sectionId => deleteSection(sectionId),
  updateRowCount: (sectionId, updateType) => (
    updateRowCount(sectionId, updateType)
  ),
  clearError: (dataTypes, id) => clearError(dataTypes, id)
};

const Pattern = ({
  match,
  patternById,
  getSectionsFromIds,
  deletePattern,
  deleteSection,
  updateRowCount,
  clearError
}) => {

  const pattern = patternById(match.params.patternId);
  const sections = getSectionsFromIds(pattern.sectionIds);

  return (
    <PatternContent
      pattern={pattern}
      sections={sections}
      deletePattern={deletePattern}
      deleteSection={deleteSection}
      clearError={clearError}
      updateRowCount={updateRowCount}
    />
  );
}

Pattern.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      patternId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  deletePattern: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  updateRowCount: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  patternById: PropTypes.func.isRequired,
  getSectionsFromIds: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
