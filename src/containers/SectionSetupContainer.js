import { connect } from 'react-redux';
import { addRow, clearSection } from 'actions';
import SectionSetup from 'components/SectionSetup';

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

const SectionSetupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionSetup);

export default SectionSetupContainer;
