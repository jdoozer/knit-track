import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  listItemText: {
    paddingRight: 0,
  },
});

const PatternTitleBlock = ({ onClick, title, classes }) => (
  <Link to="/pattern">
    <ListItem button onClick={onClick}>
      <ListItemText primary={title} className={classes.listItemText} />
    </ListItem>
    <Divider />
  </Link>
);

PatternTitleBlock.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatternTitleBlock);
