import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const styles = () => ({
  title: {
    textTransform: 'capitalize',
  },
});

class DeleteButton extends React.Component {

  state = { dialogOpen: false };

  handleClickOpen = () => { this.setState({ dialogOpen: true }) };

  handleCloseDefault = () => { this.setState({ dialogOpen: false }) };

  handleCloseAction = () => {
    this.handleCloseDefault();
    this.props.onClick();
  };

  render() {
    const { classes, dataType } = this.props;
    const { dialogOpen } = this.state;

    return (
      <>

        <IconButton color="inherit" onClick={this.handleClickOpen}>
          <DeleteIcon />
        </IconButton>

        <Dialog
          open={dialogOpen}
          onClose={this.handleCloseDefault}
        >
          <DialogTitle className={classes.title}>Delete {dataType}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this {dataType} and all its contents?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDefault} color="primary">
              cancel
            </Button>
            <Button
              onClick={this.handleCloseAction}
              color="primary"
              variant="contained"
              autoFocus
            >
              okay
            </Button>
          </DialogActions>
        </Dialog>

      </>
    );
  }

};

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  dataType: PropTypes.string.isRequired,
};

export default withStyles(styles)(DeleteButton);
