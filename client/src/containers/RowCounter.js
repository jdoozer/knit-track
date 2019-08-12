import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateRowCount } from 'actions';
import RowCounterDisplay from 'components/RowCounterDisplay';
import {
  getRowsFromSection,
  getCurrentRow,
  getSectionLoading,
  getSectionError
} from 'selectors';

const mapStateToProps = (state, props) => {
  const { sectionId } = props;
  return {
    rows: getRowsFromSection(state, sectionId),
    currentRow: getCurrentRow(state, sectionId),
    loading: getSectionLoading(state, sectionId),
    error: Boolean(getSectionError(state, sectionId)),
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

class RowCounter extends React.Component {

  render() {
    const { sectionId, ...otherProps } = this.props;
    return (
      <RowCounterDisplay {...otherProps} />
    );
  }
}

RowCounter.propTypes = {
  sectionId: PropTypes.string.isRequired,
  currentRow: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  rows: PropTypes.object.isRequired,
  onUpdateCountClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RowCounter);
