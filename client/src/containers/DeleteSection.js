import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSection, clearError } from 'actions';
import { getSectionsLoading, getSectionsErrorMsg } from 'reducers';
import DeleteIconButton from 'components/DeleteIconButton';
import ProgressModal from 'components/ProgressModal';
import ErrorSnackbar from 'components/ErrorSnackbar';

// const mapStateToProps = (state, ownProps) => ({
//   // loading: getSectionsLoading(state),
//   // error: Boolean(getSectionsErrorMsg(state)),
//   loading: ownProps.section.loading,
//   error: ownProps.section.error,
//   id: ownProps.section.sectionId,
// });

const mapDispatchToProps = {
  deleteSection: sectionId => deleteSection(sectionId),
  clearError: sectionId => clearError(['sections'], sectionId),
};

class DeleteSection extends React.Component {

  render() {

    const { section: { loading, error, sectionId },
     clearError, onClick } = this.props;

    return (
      <React.Fragment>
        <DeleteIconButton
          onClick={onClick}
          dataType="section"
        />
        <ProgressModal open={loading} />
        <ErrorSnackbar open={error} onClose={() => clearError(sectionId)}>
          Error deleting section, please retry!
        </ErrorSnackbar>
      </React.Fragment>
    );
  }

}

DeleteSection.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  deleteSection: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(DeleteSection);
