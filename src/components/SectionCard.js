import React from 'react';
import PropTypes from 'prop-types';

const SectionCard = ({ title, rowStatus, rowDetails, onClick }) => (
  <li>
    <div>{title}:</div>
    <div>{rowStatus} / {rowDetails.length}</div>
    <input type="button" title="+" onClick={onClick} />
  </li>
);

SectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  rowStatus: PropTypes.number.isRequired,
};

export default SectionCard;
