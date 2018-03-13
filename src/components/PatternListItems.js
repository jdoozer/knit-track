import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import ContentHeader from 'components/ContentHeader';
import PatternTitleBlock from 'components/PatternTitleBlock';

const styles = theme => ({
  list: {
    padding: 0,
  },
  noPattern: {
    padding: theme.spacing.unit * 2,
  },
});

const PatternListItems = ({ patterns, onPatternClick, classes }) => {

  let patternListContent = (
    <Typography variant="subheading" className={classes.noPattern}>
      No patterns created yet!
    </Typography>
  );

  if (patterns.length) {
    patternListContent = (
      <List className={classes.list}>
        {patterns.map(pattern => (
          <PatternTitleBlock
            key={pattern.patternId}
            {...pattern}
            onClick={() => onPatternClick(pattern.patternId)}
          />
        ))}
      </List>
    );
  }

  return(
    <div>
      <ContentHeader>Pattern List</ContentHeader>
      {patternListContent}
    </div>
  );
};

PatternListItems.propTypes = {
  patterns: PropTypes.arrayOf(
    PropTypes.shape({
      patternId: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onPatternClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatternListItems);
