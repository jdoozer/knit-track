import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateRowCount } from 'actions';
import { getSectionById } from 'reducers';
import SectionPanel from 'components/SectionPanel';

const mapStateToProps = (state, { sectionId }) => ({
  section: getSectionById(state, sectionId),
});

const mapDispatchToProps = {
  updateRowCount: (sectionId, updateType) => (
    updateRowCount(sectionId, updateType)
  ),
};

const Section = ({ section, updateRowCount }) => {

  if (!section) {
    return (<div>wait for it...</div>);
  }

  return (
    <SectionPanel section={section} updateRowCount={updateRowCount} />
)};

Section.propTypes = {
  updateRowCount: PropTypes.func.isRequired,
  sectionId: PropTypes.string.isRequired,
  section: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
