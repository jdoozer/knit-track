import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePattern, deleteSection, fetchPatternExpandedIfNeeded } from 'actions';
import {
  getPatternsLoading,
  getPatternsErrorMsg,
  getPatternsErrorCode,
  getSelectedPattern,
  getPatternById,
  getSelectedPatternId,
  getSelectedPatternSections
} from 'selectors';
import CircularProgress from '@material-ui/core/CircularProgress';
import PatternContent from 'components/PatternContent';
import MessageBlock from 'components/MessageBlock';

const mapStateToProps = state => ({
  patternId: getSelectedPatternId(state),
  // pattern: (getPatternsErrorCode(state) === 404) ? null : getPatternById(state, getSelectedPatternId(state)),
  pattern: getSelectedPattern(state),
  sections: getSelectedPatternSections(state),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsErrorMsg(state)),
  errorCode: getPatternsErrorCode(state),
});

const mapDispatchToProps = {
  deletePattern: patternId => deletePattern(patternId),
  deleteSection: sectionId => deleteSection(sectionId),
  fetchPatternExpandedIfNeeded: patternId => fetchPatternExpandedIfNeeded(patternId),
};

class Pattern extends React.Component {

  state = { loadingIndicator: true};

  componentDidMount() {
    const { patternId, fetchPatternExpandedIfNeeded, error } = this.props;
    if (patternId && !error) {
      fetchPatternExpandedIfNeeded(patternId);
    }
    this.setState({ loadingIndicator: false });
  }

  render() {
    const {
      patternId,
      loading,
      error,
      errorCode,
      fetchPatternExpandedIfNeeded,
      ...otherProps
    } = this.props;

    if (loading || this.state.loadingIndicator) {
      return (
        <CircularProgress />
      );
    }
    if (error) {
      if (errorCode === 404) {
        return (<MessageBlock>Pattern ID is invalid</MessageBlock>);
      }
      return (
        <MessageBlock>
          An error occurred while fetching data. Please reload to try again.
        </MessageBlock>
      );
    }
    return (<PatternContent {...otherProps} />);
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
  errorCode: PropTypes.number,
  deletePattern: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  fetchPatternExpandedIfNeeded: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
