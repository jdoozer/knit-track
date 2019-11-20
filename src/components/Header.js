import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    paddingRight: theme.spacing(1)
  }
});

const Header = ({ classes, handleDrawerToggle, loggedIn, logout }) => {

  const title = 'KnitTrack Smart Row Counter';
  const titleHomeLink = (<Link to="/home">{title}</Link>);

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        {loggedIn && <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>}
        <Typography variant="h5" color="inherit" className={classes.title}>
          {loggedIn ? titleHomeLink : title}
        </Typography>
        {loggedIn && <Button color="inherit" onClick={logout}>logout</Button>}
      </Toolbar>
    </AppBar>
  )
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
