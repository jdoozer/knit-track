import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/Button';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog';

const styles = theme => ({
  root: {
    minWidth: 0,
    padding: theme.spacing.unit,
  },
});

class HeaderAction extends React.Component {

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
    const { buttonProps, history } = this.props;
    const { onClick, newLocation } = buttonProps;

    onClick();
    history.push(newLocation);
  }

  render() {
    const { classes, buttonProps } = this.props;
    const { icon, dialogTitle, dialogText } = buttonProps;
    return (
      <div>
        <IconButton color="inherit" className={classes.root} onClick={this.handleClickOpen}>
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
              <Button onClick={this.handleCloseAction} raised color="primary" autoFocus>
                okay
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  }

};

HeaderAction.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  buttonProps: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    newLocation: PropTypes.string.isRequired,
    icon: PropTypes.element,
    dialogText: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(withRouter(HeaderAction));
