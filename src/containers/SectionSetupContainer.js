import { connect } from 'react-redux';
import { addRow, clearSection } from 'actions';
import SectionSetup from 'components/SectionSetup';

const mapStateToProps = (state) => {
  const sectionId = state.sections.sectionToEdit;
  const numRows = sectionId ? state.sections.byId[sectionId].numRows : null;

  return {
    numRows,
    sectionId
  };
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
