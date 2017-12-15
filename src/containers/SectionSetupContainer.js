import { connect } from 'react-redux';
import { addRow } from 'actions';
import SectionSetup from 'components/SectionSetup';

const mapStateToProps = (state) => {
  const sectionID = state.sections.selected;
  const numRows = sectionID ? state.sections.byID[sectionID].numRows : null;

  return {
    numRows,
    sectionID
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRow: (sectionID, rowInfo) => {
      dispatch(addRow(sectionID, rowInfo));
    }
  };
};

const SectionSetupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionSetup);

export default SectionSetupContainer;
