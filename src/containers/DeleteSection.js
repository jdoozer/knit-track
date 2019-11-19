import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getSectionLoading, getSectionError, getSectionLastAction
} from 'reducers';
import { deleteSection, clearError } from 'actions';
import DeleteButton from 'components/DeleteButton';
import ProgressModal from 'components/ProgressModal';
import ErrorSnackbar from 'components/ErrorSnackbar';

const mapStateToProps = (state, { sectionId }) => ({
  loading: getSectionLoading(state, sectionId),
  error: Boolean(getSectionError(state, sectionId)),
  lastActionType: getSectionLastAction(state, sectionId),
});

const mapDispatchToProps = {
  deleteSection: sectionId => deleteSection(sectionId),
  clearError: sectionId => clearError('sections', sectionId)
};

const DeleteSection = ({
  sectionId, loading, error, lastActionType, clearError, deleteSection
}) => (
  <>

    <DeleteButton
      onClick={() => deleteSection(sectionId)}
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

DeleteSection.propTypes = {
  sectionId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  lastActionType: PropTypes.string.isRequired,
  deleteSection: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSection);
