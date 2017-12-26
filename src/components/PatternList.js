import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ContentHeader from 'components/ContentHeader';
import PatternTitleBlock from 'components/PatternTitleBlock';

const styles = () => ({
  list: {
    padding: 0,
  },
});

const PatternList = ({ patterns, onPatternClick, classes }) => (
  <div>
    <ContentHeader>Pattern List</ContentHeader>
    <Divider />
    <List className={classes.list}>
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
  onPatternClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatternList);
