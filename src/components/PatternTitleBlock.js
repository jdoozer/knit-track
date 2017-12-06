import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PatternTitleBlock = ({ onClick, title }) => (
  <li onClick={onClick}>
    <Link to="/pattern">
      {title}
    </Link>
  </li>
);

PatternTitleBlock.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default PatternTitleBlock;
