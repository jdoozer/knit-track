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
  patterns: PropTypes.shape({
    byID: PropTypes.object.isRequired,
    allIDs: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onPatternClick: PropTypes.func.isRequired
};

export default PatternList;
