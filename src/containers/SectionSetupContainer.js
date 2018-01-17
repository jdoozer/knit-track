import { connect } from 'react-redux';
import { addRow } from 'actions';
import SectionSetup from 'components/SectionSetup';

const mapStateToProps = (state) => {
  const sectionId = state.sections.selected;
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
    }
  };
};

const SectionSetupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionSetup);

export default SectionSetupContainer;
