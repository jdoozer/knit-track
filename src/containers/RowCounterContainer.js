import { connect } from 'react-redux';
import { updateRowCount } from 'actions';
import RowCounter from 'components/RowCounter';

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

const RowCounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RowCounter);

export default RowCounterContainer;
