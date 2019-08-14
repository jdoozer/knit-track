import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = theme => ({
  root: {
    minWidth: 0,
    padding: theme.spacing(1),
  },
});

class ActionIconButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
  }

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  }

  handleCloseDefault = () => {
    this.setState({ dialogOpen: false });
  }

  handleCloseAction = () => {
    this.handleCloseDefault();
    const { onClick, newLocation, history } = this.props;

    onClick();
    if (newLocation) {
      history.push(newLocation);
    }
  }

  render() {
    const { classes, icon, dialogTitle, dialogText, className } = this.props;

    return (
      <Fragment>
        <IconButton
          color="inherit"
          className={`${classes.root} ${className}`}
          onClick={this.handleClickOpen}
        >
          {icon}
        </IconButton>
        {dialogTitle && (
          <Dialog
            open={this.state.dialogOpen}
            onClose={this.handleCloseDefault}
          >
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText>{dialogText}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDefault} color="primary">
                cancel
              </Button>
              <Button onClick={this.handleCloseAction} variant="contained" color="primary" autoFocus>
                okay
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Fragment>
    );
  }

};

ActionIconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  newLocation: PropTypes.string,
  icon: PropTypes.element.isRequired,
  dialogTitle: PropTypes.string,
  dialogText: PropTypes.string,
};

export default withStyles(styles)(withRouter(ActionIconButton));
