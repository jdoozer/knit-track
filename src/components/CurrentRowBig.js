import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import gray from '@material-ui/core/colors/blueGrey';

const borderColor = gray[700];
const textColor = gray[900];

const styles = theme => ({
  root: {
    border: 'solid 2px ' + borderColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    height: 94,
    marginRight: theme.spacing(1),
    padding: theme.spacing(0, 1),
    color: ({ color }) => color || textColor,
    background: ({ max, currentRow }) => (
      (currentRow === max) ? theme.palette.primary.bg : '#FFF'
    ),
  }
});

const CurrentRowBig = ({ currentRow, max, updateRowCount, classes }) => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newRow, setNewRow] = useState(currentRow);
  const [err, setError] = useState(false);

  const validateRow = ({ target: { value }}) => {
    if (value < 1) {
      setNewRow(1);
      setError(true);
    } else if (value > max) {
      setNewRow(max);
      setError(true);
    } else {
      setNewRow(value);
      setError(false);
    }
  }

  const updateAndClose = () => {
    updateRowCount(parseInt(newRow, 10));
    setDialogOpen(false);
  }

  return (<>

    <Paper className={classes.root} elevation={1}>
      <Typography variant="h3" onClick={() => setDialogOpen(true)}>
        {currentRow}
      </Typography>
    </Paper>

    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <form onSubmit={e => e.preventDefault()}>
        <DialogTitle>New Row:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="newRow"
            type="number"
            variant="outlined"
            defaultValue={currentRow}
            fullWidth
            onChange={validateRow}
            error={err}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            cancel
          </Button>
          <Button onClick={updateAndClose} color="primary" variant="contained" type="submit">
            update
          </Button>
        </DialogActions>
      </form>
    </Dialog>

  </>)
};

CurrentRowBig.propTypes = {
  currentRow: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  updateRowCount: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
};

export default withStyles(styles)(CurrentRowBig);
