import React from 'react';
import { connect } from 'react-redux';
import { createSection, fetchPatternExpandedIfNeeded } from 'actions';
import SectionSetupForm from 'components/SectionSetupForm';
import {
  getPatternsLoading,
  getPatternsError,
  getSelectedPattern,
  getSelectedPatternId,
} from 'selectors';

const mapStateToProps = state => ({
  patternId: getSelectedPatternId(state),
  pattern: getSelectedPattern(state),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsError(state))
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionSetup);
