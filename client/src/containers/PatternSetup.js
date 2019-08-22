import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPattern, clearLastCreated, clearError } from 'actions';
import {
  getLastCreatedPatternId,
  getPatternsLoading,
  getPatternsErrorMsg
} from 'reducers';
import PatternSetupForm from 'components/PatternSetupForm';

const mapStateToProps = state => ({
  lastCreatedId: getLastCreatedPatternId(state),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsErrorMsg(state)),
});

const mapDispatchToProps = {
  createPattern: patternData => createPattern(patternData),
  clearError: () => clearError(['patterns']),
  clearLastCreated: () => clearLastCreated(['patterns']),
};

class PatternSetup extends React.Component {

  componentDidUpdate() {
    const { lastCreatedId, history } = this.props;
    if (lastCreatedId) {
      history.push(`/patterns/${lastCreatedId}`);
    }
  }

  componentWillUnmount() {
    this.props.clearLastCreated();
  }

  render() {
    const { createPattern, clearError, loading, error } = this.props;
    return (
      <PatternSetupForm
        createPattern={createPattern}
        clearError={clearError}
        loading={loading}
        error={error}
      />
    );
  }

}

PatternSetup.propTypes = {
  lastCreatedId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  createPattern: PropTypes.func.isRequired,
  clearLastCreated: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatternSetup);
