import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/Button';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    minWidth: 0,
    padding: theme.spacing.unit,
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
          className={classNames(classes.root, className)}
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
              <Button onClick={this.handleCloseAction} variant="raised" color="primary" autoFocus>
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
  dialogText: PropTypes.string.isRequired,
};

export default withStyles(styles)(withRouter(ActionIconButton));
