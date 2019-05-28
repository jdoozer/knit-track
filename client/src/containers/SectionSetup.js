import React from 'react';
import { connect } from 'react-redux';
import { addSectionWithRows, fetchPatternExpandedIfNeeded } from 'actions';
import SectionSetupForm from 'components/SectionSetupForm';
import { getSelectedPatternId, getSelectedPattern } from 'selectors';

const mapStateToProps = state => ({
  patternId: getSelectedPatternId(state),
  pattern: getSelectedPattern(state),
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
    const { fetchPatternExpandedIfNeeded, ...otherProps } = this.props;
    return (
      <SectionSetupForm {...otherProps} />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SectionSetup);
