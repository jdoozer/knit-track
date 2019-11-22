import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateRowCount, subscribeRowCount } from 'actions';
import { getSectionById } from 'reducers';
import SectionPanel from 'components/SectionPanel';

const mapStateToProps = (state, { sectionId }) => ({
  section: getSectionById(state, sectionId),
});

const mapDispatchToProps = {
  updateRowCount: (sectionId, updateType) => (
    updateRowCount(sectionId, updateType)
  ),
  subscribeRowCount: (sectionId, listenerOn) => (
    subscribeRowCount(sectionId, listenerOn)
  ),
};

// USE HOOKS!
class Section extends React.Component {

  state = { subscribed: false };

  componentDidUpdate() {
    if (this.props.section && !this.state.subscribed) {
      this.props.subscribeRowCount(this.props.sectionId, true);
      this.setState({ subscribed: true });
    }
  }

  componentWillUnmount() {
    if (this.props.section && this.state.subscribed)
      this.props.subscribeRowCount(this.props.sectionId, false);
  }

  render() {
    const { section, updateRowCount } = this.props;

    if (!section) {
      return (<div>wait for it...</div>);
    }

    return (
      <SectionPanel section={section} updateRowCount={updateRowCount} />
    )
  }

};

Section.propTypes = {
  updateRowCount: PropTypes.func.isRequired,
  sectionId: PropTypes.string.isRequired,
  section: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
