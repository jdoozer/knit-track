import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateRowCount, fetchRowsIfNeeded } from 'actions';
import RowCounterDisplay from 'components/RowCounterDisplay';
import { getRowsFromSection, getCurrentRow } from 'selectors';

const mapStateToProps = (state, props) => {
  return {
    rows: getRowsFromSection(state, props), /// why is props here?
    currentRow: getCurrentRow(state, props),
    isFetching: state.rows.isFetching,
    // isFetching: false
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { sectionId } = props;
  return {
    onUpdateCountClick: updateType => {
      dispatch(updateRowCount(sectionId, updateType))
    },
    fetchRowsIfNeeded: () => {
      dispatch(fetchRowsIfNeeded(sectionId));
    }
  };
};

class RowCounter extends React.Component {

  componentDidMount() {
    this.props.fetchRowsIfNeeded();
  }

  render() {
    const { fetchRowsIfNeeded, sectionId, ...otherProps } = this.props;
    return (
      <RowCounterDisplay {...otherProps} />
    );
  }
}

RowCounter.propTypes = {
  sectionId: PropTypes.string.isRequired,
  currentRow: PropTypes.number.isRequired,
  rows: PropTypes.array.isRequired,
  onUpdateCountClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RowCounter);
