import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSection, fetchPatternExpandedIfNeeded } from 'actions';
import SectionSetupForm from 'components/SectionSetupForm';
import {
  getPatternsLoading,
  getPatternsErrorMsg,
  getPatternsErrorCode,
  getSelectedPattern,
  getSelectedPatternId,
} from 'selectors';

const mapStateToProps = state => ({
  patternId: getSelectedPatternId(state),
  pattern: getSelectedPattern(state),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsErrorMsg(state)),
  errorCode: getPatternsErrorCode(state),
});

const mapDispatchToProps = {
  createSection: section => createSection(section),
  fetchPatternExpandedIfNeeded: patternId => fetchPatternExpandedIfNeeded(patternId),
};

class SectionSetup extends React.Component {

  componentDidMount() {
    const { patternId, fetchPatternExpandedIfNeeded, error } = this.props;
    if (patternId && !error) {
      fetchPatternExpandedIfNeeded(patternId);
    }
  }

  render() {
    const { fetchPatternExpandedIfNeeded, patternId, ...otherProps } = this.props;

    return (
      <SectionSetupForm {...otherProps} />
    );
  }

}

SectionSetup.propTypes = {
  patternId: PropTypes.string.isRequired,
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    patternId: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorCode: PropTypes.number,
  createSection: PropTypes.func.isRequired,
  fetchPatternExpandedIfNeeded: PropTypes.func.isRequired,

}

export default connect(mapStateToProps, mapDispatchToProps)(SectionSetup);
