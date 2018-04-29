import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePattern, deleteSection, fetchSectionsIfNeeded } from 'actions';
import PatternContent from 'components/PatternContent';
import { getSelectedPattern, getSelectedPatternSections } from 'selectors';

const mapStateToProps = state => ({
  pattern: getSelectedPattern(state),
  sections: getSelectedPatternSections(state),
  isFetching: state.sections.isFetching,
});

const mapDispatchToProps = dispatch => ({
  deletePattern: patternId => {
    dispatch(deletePattern(patternId));
  },
  deleteSection: sectionId => {
    dispatch(deleteSection(sectionId));
  },
  fetchSectionsIfNeeded: patternId => {
    dispatch(fetchSectionsIfNeeded());
  },
});

class Pattern extends React.Component {

  componentDidMount() {
    this.props.fetchSectionsIfNeeded();
  }

  render() {
    const { fetchSectionsIfNeeded, ...otherProps } = this.props;
    return (
      <PatternContent {...otherProps} />
    );
  }

}

Pattern.propTypes = {
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
  deletePattern: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  fetchSectionsIfNeeded: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
