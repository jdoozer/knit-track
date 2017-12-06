import React from 'react';
import PropTypes from 'prop-types';
import PatternTitleBlock from './PatternTitleBlock';

const PatternList = ({ patterns, onPatternClick }) => (
  <ul>
    {patterns.map((pattern, index) => (
      <PatternTitleBlock
        key={index}
        {...pattern}
        onClick={() => onPatternClick(index)}
      />
    ))}
  </ul>
);

PatternList.propTypes = {
  patterns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPatternClick: PropTypes.func.isRequired
};

export default PatternList;
