import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  modal: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: '50%',
    top: '50%',
    marginLeft: -30,
    marginTop: -30,
    backgroundColor: '#CCC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0,
    borderRadius: 15,
  },
});

const ProgressModal = ({ open, classes }) => (
  <Modal open={open}>
    <div className={classes.modal}><CircularProgress /></div>
  </Modal>
);

ProgressModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ProgressModal);
