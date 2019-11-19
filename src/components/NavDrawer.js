import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavMenuItem from 'components/NavMenuItem';
import AddPattern from 'components/AddPattern';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    [theme.breakpoints.up('md')]: theme.mixins.toolbar
  },
  loading: {
    textAlign: 'center',
  }
}));

const NavDrawer = ({
  placeholder, patternTitles, mobileOpen, handleDrawerToggle, loadingPatterns
}) => {
  const classes = useStyles();
  if (placeholder)
    return (<div className={classes.drawer} />);

  let mobileDrawerLinkProps = {};
  if (mobileOpen)
    mobileDrawerLinkProps.onClick = handleDrawerToggle;

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <AddPattern />
      <List component="nav">
        <NavMenuItem level={0} key="patterns">Patterns</NavMenuItem>
        {loadingPatterns
          ? (<div className={classes.loading}><CircularProgress /></div>)
          : patternTitles.map(({ patternId, title }) => (
            <NavMenuItem
              level={1}
              link={`/patterns/${patternId}`}
              key={patternId}
              {...mobileDrawerLinkProps}
            >
              {title}
            </NavMenuItem>
          ))
        }
        <NavMenuItem
          level={0}
          link="/about"
          key="about"
          {...mobileDrawerLinkProps}
        >
          About
        </NavMenuItem>
      </List>
    </>
  );

  return (
    <>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  )
};

NavDrawer.propTypes = {
  patternTitles: PropTypes.arrayOf(
    PropTypes.shape({
      patternId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.bool.isRequired,
}

export default NavDrawer;
