import React from 'react';
import PropTypes from 'prop-types';
import RowCounterContainer from 'containers/RowCounterContainer';

const SectionCard = ({ section }) => {
  const { title, sectionID } = section;

  return(
    <li>
      <div>{title}</div>
      <RowCounterContainer sectionID={sectionID} dynamic />
    </li>
  );
};

SectionCard.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    currentRow: PropTypes.number.isRequired,
    rows: PropTypes.array.isRequired
  }).isRequired
};

export default SectionCard;
