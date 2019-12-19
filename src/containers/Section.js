import React, { useState, useEffect } from 'react';
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

const Section = (props) => {

  const [subscribed, setSubscribed] = useState(false);
  const { section, sectionId, updateRowCount, subscribeRowCount } = props;

  useEffect(() => {
    if (sectionId && !subscribed) {
      subscribeRowCount(sectionId, true);
      setSubscribed(true);
    }
    return (() => {
      if (subscribed)
        subscribeRowCount(sectionId, false);
    });
  }, [sectionId, subscribed, subscribeRowCount]);

  if (!section) {
    return (<div>wait for it...</div>);
  }

  return (
    <SectionPanel section={section} updateRowCount={updateRowCount} />
  )

}

Section.propTypes = {
  updateRowCount: PropTypes.func.isRequired,
  subscribeRowCount: PropTypes.func.isRequired,
  sectionId: PropTypes.string.isRequired,
  section: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
