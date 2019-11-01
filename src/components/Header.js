import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
  },
});

const Header = ({ classes }) => (
  <AppBar position="fixed" className={classes.root}>
    <Toolbar>
      <Typography variant="h5" color="inherit">
        <Link to="/home">
          KnitTrack Smart Row Counter
        </Link>
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
