import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


const styles = () => ({
  root: {
    width: '100%'
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  }
});

const Header = ({ classes }) => (
  <header className={classes.root}>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography type="title">
          <Link to="/" className={classes.link}>
            Knit Track Smart Row Counter
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  </header>
);

export default withStyles(styles)(Header);
