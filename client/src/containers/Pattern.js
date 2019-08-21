import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePattern, deleteSection, updateRowCount } from 'actions';
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
};

const Pattern = ({
  match,
  patternById,
  getSectionsFromIds,
  deletePattern,
  deleteSection,
  updateRowCount
}) => {

  const pattern = patternById(match.params.patternId);
  const sections = getSectionsFromIds(pattern.sectionIds);

  return (
    <PatternContent
      pattern={pattern}
      sections={sections}
      deletePattern={deletePattern}
      deleteSection={deleteSection}
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
  patternById: PropTypes.func.isRequired,
  getSectionsFromIds: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
