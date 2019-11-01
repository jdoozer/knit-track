import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import NavMenuItem from 'components/NavMenuItem';
import AddPattern from 'components/AddPattern';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const NavMenuContent = ({ placeholder, patternTitles }) => {
  const classes = useStyles();
  if (placeholder) {
    return (<div className={classes.drawer} />);
  }
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.toolbar} />
      <AddPattern />
      <List component="nav">
        <NavMenuItem level={0} key="patterns">Patterns</NavMenuItem>
        {patternTitles.map(({ patternId, title }) => (
          <NavMenuItem level={1} link={`/patterns/${patternId}`} key={patternId}>
            {title}
          </NavMenuItem>
        ))}
        <NavMenuItem level={0} link="/about" key="about">About</NavMenuItem>
      </List>
    </Drawer>
  )
};

NavMenuContent.propTypes = {
  patternTitles: PropTypes.arrayOf(
    PropTypes.shape({
      patternId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.bool.isRequired,
}

export default NavMenuContent;
