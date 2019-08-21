import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPattern, clearLastCreated } from 'actions';
import { getLastCreatedPatternId } from 'reducers';
import PatternSetupForm from 'components/PatternSetupForm';

const mapStateToProps = state => ({
  lastCreatedId: getLastCreatedPatternId(state),
});

const mapDispatchToProps = {
  createPattern: patternData => createPattern(patternData),
  clearLastCreated
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
    return (
      <PatternSetupForm createPattern={this.props.createPattern} />
    );
  }

}

PatternSetup.propTypes = {
  lastCreatedId: PropTypes.string.isRequired,
  createPattern: PropTypes.func.isRequired,
  clearLastCreated: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatternSetup);
