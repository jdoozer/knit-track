import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePattern, deleteSection, fetchPatternExpandedIfNeeded } from 'actions';
import PatternContent from 'components/PatternContent';
import {
  getPatternLoading,
  getSectionLoading,
  getSelectedPattern,
  getSelectedPatternId,
  getSelectedPatternSections
} from 'selectors';

const mapStateToProps = state => ({
  patternId: getSelectedPatternId(state),
  pattern: getSelectedPattern(state),
  sections: getSelectedPatternSections(state),
  loading: (getPatternLoading(state) || getSectionLoading(state)),
});

const mapDispatchToProps = {
  deletePattern: patternId => deletePattern(patternId),
  deleteSection: sectionId => deleteSection(sectionId),
  fetchPatternExpandedIfNeeded: patternId => fetchPatternExpandedIfNeeded(patternId),
};

class Pattern extends React.Component {

  componentDidMount() {
    const { patternId, fetchPatternExpandedIfNeeded } = this.props;
    if (patternId) {
      fetchPatternExpandedIfNeeded(patternId);
    }
  }

  render() {
    const { fetchPatternExpandedIfNeeded, ...otherProps } = this.props;
    return (
      <PatternContent {...otherProps} />
    );
  }

}

Pattern.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string,
    info: PropTypes.string,
    patternId: PropTypes.string.isRequired,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionId: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  deletePattern: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  fetchPatternExpandedIfNeeded: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
