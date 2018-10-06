import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePattern, deleteSection, fetchPatternSectionsIfNeeded } from 'actions';
import PatternContent from 'components/PatternContent';
import { getSelectedPattern, getSelectedPatternSections } from 'selectors';

const mapStateToProps = state => ({
  pattern: getSelectedPattern(state),
  sections: getSelectedPatternSections(state),
  patternIsFetching: state.patterns.isFetching,
  sectionsIsFetching: state.sections.isFetching,
});

const mapDispatchToProps = dispatch => ({
  deletePattern: patternId => {
    dispatch(deletePattern(patternId));
  },
  deleteSection: sectionId => {
    dispatch(deleteSection(sectionId));
  },
  fetchPatternSectionsIfNeeded: patternId => {
    dispatch(fetchPatternSectionsIfNeeded(patternId));
  },
});

class Pattern extends React.Component {

  componentDidMount() {
   this.props.fetchPatternSectionsIfNeeded(this.props.pattern.patternId);
  }

  render() {
    const { fetchPatternSectionsIfNeeded, ...otherProps } = this.props;
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
  fetchPatternSectionsIfNeeded: PropTypes.func.isRequired,
  patternIsFetching: PropTypes.bool.isRequired,
  sectionsIsFetching: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
