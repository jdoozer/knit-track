import { connect } from 'react-redux';
import { updateRowCount } from 'actions';
import RowCounter from 'components/RowCounter';

const mapStateToProps = (state, ownProps) => {
  const { rows, sectionID, ...passThruProps } = ownProps;
  const rowData = rows.map(rowID => state.rows.byID[rowID]);

  return {
    rowData,
    ...passThruProps,
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
