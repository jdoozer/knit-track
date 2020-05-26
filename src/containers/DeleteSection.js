import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { deleteSection, clearError } from 'actions';
import DeleteButton from 'components/DeleteButton';
import ProgressModal from 'components/ProgressModal';
import ErrorSnackbar from 'components/ErrorSnackbar';
import { getSectionById } from 'reducers';

const mapStateToProps = (state, { sectionId }) => ({
  // loading: getSectionLoading(state, sectionId),
  // error: Boolean(getSectionError(state, sectionId)),
  // lastActionType: getSectionLastAction(state, sectionId),
  section: getSectionById(state, sectionId),
});

const mapDispatchToProps = {
  deleteSection,
  clearError: sectionId => clearError('sections', sectionId)
};

const DeleteSection = ({
  sectionId, section, clearError, deleteSection, history
}) => {
  const { loading, error, lastActionType, patternId } = section;

  return (
    <>
      <DeleteButton
        onClick={() => deleteSection(sectionId, patternId, history)}
        dataType="section"
      />
      <ProgressModal open={loading && lastActionType==='deleteSection'} />
      <ErrorSnackbar
        open={error && !loading && lastActionType==='deleteSection'}
        onClose={clearError}
      >
        Error deleting section, please retry!
      </ErrorSnackbar>
    </>
  );
};

DeleteSection.propTypes = {
  sectionId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  lastActionType: PropTypes.string.isRequired,
  deleteSection: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteSection));
