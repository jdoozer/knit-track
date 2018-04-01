import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  listItemText: {
    paddingRight: 0,
    textAlign: 'center',
  },
});

const ListLinkBlock = ({ link, onClick, title, classes }) => (
  <Link to={link}>
    <ListItem button onClick={onClick}>
      <ListItemText primary={title} className={classes.listItemText} />
    </ListItem>
  </Link>
);

ListLinkBlock.propTypes = {
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListLinkBlock);
