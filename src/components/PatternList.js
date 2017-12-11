import React from 'react';
import PropTypes from 'prop-types';
import PatternTitleBlock from './PatternTitleBlock';

const PatternList = ({ patterns, onPatternClick }) => (
  <ul>
    {patterns.map(pattern => (
      <PatternTitleBlock
        key={pattern.patternID}
        {...pattern}
        onClick={() => onPatternClick(pattern.patternID)}
      />
    ))}
  </ul>
);

PatternList.propTypes = {
  patterns: PropTypes.arrayOf(
    PropTypes.shape({
      patternID: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onPatternClick: PropTypes.func.isRequired
};

export default PatternList;
