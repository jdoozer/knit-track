import React from 'react';
import { connect } from 'react-redux';
import { addSectionWithRows, fetchPatternExpandedIfNeeded } from 'actions';
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
  addSectionWithRows: (sectionData, rowData) => addSectionWithRows(sectionData, rowData),
  fetchPatternExpandedIfNeeded: patternId => fetchPatternExpandedIfNeeded(patternId),
};

class SectionSetup extends React.Component {

  componentDidMount() {
    const { patternId, fetchPatternExpandedIfNeeded } = this.props;
    if (patternId) {
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
