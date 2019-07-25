import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePattern, deleteSection, fetchPatternExpanded } from 'actions';
import PatternContent from 'components/PatternContent';
import {
  getPatternsLoading,
  // getSectionLoading,
  // getPatternLoading,
  // getPatternError,
  getSelectedPattern,
  getSelectedPatternId,
  getSelectedPatternSections
} from 'selectors';

const mapStateToProps = state => {
  const patternId = getSelectedPatternId(state);
  return {
    patternId,
    pattern: getSelectedPattern(state),
    sections: getSelectedPatternSections(state),
    loading: getPatternsLoading(state),
    error: Boolean(null),
    // loading: getPatternLoading(state, patternId),
    // loading: true,
    // error: Boolean(getPatternError(state, patternId))
  }
};

const mapDispatchToProps = {
  deletePattern: patternId => deletePattern(patternId),
  deleteSection: sectionId => deleteSection(sectionId),
  fetchPatternExpanded: patternId => fetchPatternExpanded(patternId),
};

class Pattern extends React.Component {

  componentDidMount() {
    const { patternId, fetchPatternExpanded } = this.props;
    if (patternId) {
      fetchPatternExpanded(patternId);
    }
  }

  render() {
    const { patternId, fetchPatternExpanded, ...otherProps } = this.props;
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
  fetchPatternExpanded: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
