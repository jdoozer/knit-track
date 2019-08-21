import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListLinkBlock from 'components/ListLinkBlock';

const styles = () => ({
  root: {
    padding: 0,
  },
});

const PatternListItems = ({ patternTitles, classes }) => (
  <List className={classes.root}>
    {patternTitles.map(({ patternId, title }) => (
      <React.Fragment key={patternId}>
        <ListLinkBlock
          link={`/patterns/${patternId}`}
          title={title}
        />
        <Divider />
      </React.Fragment>
    ))}
  </List>
);

PatternListItems.propTypes = {
  patternTitles: PropTypes.arrayOf(
    PropTypes.shape({
      patternId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatternListItems);
