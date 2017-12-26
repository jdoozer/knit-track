import { connect } from 'react-redux';
import { updateRowCount } from 'actions';
import RowCounter from 'components/RowCounter';

const mapStateToProps = (state, ownProps) => {
  const { sectionID } = ownProps;
  const section = state.sections.byID[sectionID];
  const { rows, currentRow } = section;
  const rowData = rows.map(rowID => state.rows.byID[rowID]);

  return {
    sectionID,
    currentRow,
    rowData,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { sectionID } = ownProps;
  return {
    onUpdateCountClick: updateType => {
      dispatch(updateRowCount(sectionID, updateType))
    }
  };
};

const RowCounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RowCounter);

export default RowCounterContainer;
