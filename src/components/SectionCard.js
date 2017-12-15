import React from 'react';
import PropTypes from 'prop-types';
import RowCounterContainer from 'containers/RowCounterContainer';

const SectionCard = ({ title, sectionID }) => {

  return(
    <li>
      <div>{title}</div>
      <RowCounterContainer sectionID={sectionID} dynamic />
    </li>
  );
};

SectionCard.propTypes = {
  sectionID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default SectionCard;
