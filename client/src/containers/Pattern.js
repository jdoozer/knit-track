import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePattern, deleteSection, fetchPatternExpanded } from 'actions';
import PatternContent from 'components/PatternContent';
import {
  getPatternsLoading,
  getPatternsError,
  getSelectedPattern,
  getSelectedPatternId,
  getSelectedPatternSections
} from 'selectors';

const mapStateToProps = state => ({
  patternId: getSelectedPatternId(state),
  pattern: getSelectedPattern(state),
  sections: getSelectedPatternSections(state),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsError(state))
});

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
  patternId: PropTypes.string.isRequired,
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    patternId: PropTypes.string.isRequired,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionId: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  deletePattern: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  fetchPatternExpanded: PropTypes.func.isRequired,

}

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
