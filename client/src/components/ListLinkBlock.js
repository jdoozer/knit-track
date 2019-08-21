import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  listItemText: {
    paddingRight: 0,
    textAlign: 'center',
  },
});

const ListLinkBlock = ({ link, title, classes }) => (
  <Link to={link}>
    <ListItem button>
      <ListItemText primary={title} className={classes.listItemText} />
    </ListItem>
  </Link>
);

ListLinkBlock.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListLinkBlock);
