import { connect } from 'react-redux';
import { updateRowCount } from 'actions';
import RowCounterDisplay from 'components/RowCounterDisplay';
import { getRowsFromSection, getCurrentRow } from 'selectors';

const mapStateToProps = (state, props) => {
  return {
    rows: getRowsFromSection(state, props),
    currentRow: getCurrentRow(state, props),
    ...props,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { sectionId } = props;
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
