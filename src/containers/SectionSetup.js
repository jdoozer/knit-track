import { connect } from 'react-redux';
import { addRow, clearSection } from 'actions';
import SectionSetupForm from 'components/SectionSetupForm';

const mapStateToProps = (state, ownProps) => {

  const sectionToEdit = state.ui.sectionToEdit;
  const numRows = sectionToEdit ? state.sections.byId[sectionToEdit].numRows : 0;

  return { numRows, sectionId: sectionToEdit, ...ownProps };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRow: (sectionId, rowInfo) => {
      dispatch(addRow(sectionId, rowInfo));
    },
    clearSection: () => {
      dispatch(clearSection());
    }
  };
};

const SectionSetup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionSetupForm);

export default SectionSetup;
