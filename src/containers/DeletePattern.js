import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPatternLoading, getPatternError, getPatternLastAction
} from 'reducers';
import { deletePattern, clearError } from 'actions';
import DeleteButton from 'components/DeleteButton';
import ProgressModal from 'components/ProgressModal';
import ErrorSnackbar from 'components/ErrorSnackbar';

const mapStateToProps = (state, { patternId }) => ({
  loading: getPatternLoading(state, patternId),
  error: Boolean(getPatternError(state, patternId)),
  lastActionType: getPatternLastAction(state, patternId),
});

const mapDispatchToProps = {
  deletePattern: patternId => deletePattern(patternId),
  clearError: patternId => clearError(['patterns'], patternId)
};

const DeletePattern = ({
  patternId, loading, error, lastActionType, clearError, deletePattern
}) => (
  <React.Fragment>

    <DeleteButton
      onClick={() => deletePattern(patternId)}
      dataType="pattern"
    />

    <ProgressModal open={loading && lastActionType==='deletePattern'} />

    <ErrorSnackbar
      open={error && lastActionType==='deletePattern'}
      onClose={() => clearError(patternId)}
    >
      Error deleting pattern, please retry!
    </ErrorSnackbar>

  </React.Fragment>
);

DeletePattern.propTypes = {
  patternId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  lastActionType: PropTypes.string.isRequired,
  deletePattern: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePattern);
