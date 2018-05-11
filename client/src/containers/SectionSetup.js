import { connect } from 'react-redux';
import { addRow, clearSection } from 'actions';
import SectionSetupForm from 'components/SectionSetupForm';
import { getNumRowsSection, getSectionIdToEdit } from 'selectors';

const mapStateToProps = (state, props) => ({
    numRows: getNumRowsSection(state),
    sectionId: getSectionIdToEdit(state),
    ...props
});

const mapDispatchToProps = dispatch => {
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
