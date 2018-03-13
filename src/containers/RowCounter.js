import { connect } from 'react-redux';
import { updateRowCount } from 'actions';
import RowCounterDisplay from 'components/RowCounterDisplay';

const mapStateToProps = (state, ownProps) => {
  const { rowIds, sectionId, ...passThruProps } = ownProps;
  const rows = rowIds.map(rowId => state.rows.byId[rowId]);

  return {
    rows,
    ...passThruProps,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { sectionId } = ownProps;
  return {
    onUpdateCountClick: updateType => {
      dispatch(updateRowCount(sectionId, updateType))
    }
  };
};

const RowCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(RowCounterDisplay);

export default RowCounter;
