import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import PatternTitleBlock from './PatternTitleBlock';

const PatternList = ({ patterns, onPatternClick }) => (
  <div>
    <Typography type="title">Pattern List</Typography>
    <List>
      {patterns.map(pattern => (
        <PatternTitleBlock
          key={pattern.patternID}
          {...pattern}
          onClick={() => onPatternClick(pattern.patternID)}
        />
      ))}
    </List>
  </div>
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
