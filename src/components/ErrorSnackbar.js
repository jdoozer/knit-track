import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  snackbar: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex'
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
});

const ErrorSnackbar = ({ open, classes, onClose, children }) => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    open={!!open}
    autoHideDuration={3000}
    onClose={onClose}
  >
    <SnackbarContent
      className={classes.snackbar}
      message={
        <span className={classes.message}>
          <ErrorIcon className={classes.icon} />
          {children}
        </span>
      }
    />
  </Snackbar>
);

ErrorSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ErrorSnackbar);
