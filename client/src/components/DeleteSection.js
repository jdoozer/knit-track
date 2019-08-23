import React from 'react';
import PropTypes from 'prop-types';
import DeleteButton from 'components/DeleteButton';
import ProgressModal from 'components/ProgressModal';
import ErrorSnackbar from 'components/ErrorSnackbar';

const DeleteSection = ({
  loading, error, clearError, onClick
}) => (
  <React.Fragment>

    <DeleteButton
      onClick={onClick}
      dataType="section"
    />

    <ProgressModal open={loading} />

    <ErrorSnackbar
      open={error}
      onClose={clearError}
    >
      Error deleting section, please retry!
    </ErrorSnackbar>

  </React.Fragment>
);

DeleteSection.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default DeleteSection;
