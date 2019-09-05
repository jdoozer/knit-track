import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ProgressModal from 'components/ProgressModal';
import ErrorSnackbar from 'components/ErrorSnackbar';
import ContentHeader from 'components/ContentHeader';

const styles = theme => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(3),
  },
});

class PatternSetupForm extends React.Component {

  state = {
    title: '' ,
    info: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { createPattern } = this.props;
    const { title, info } = this.state;

    createPattern({ title, info });
    event.preventDefault();
  };

  render() {

    const { classes, loading, error, clearError } = this.props;
    const { title, info } = this.state;

    return (
      <React.Fragment>

        <ContentHeader>Pattern Setup</ContentHeader>
        <form onSubmit={this.handleSubmit} className={classes.root}>
          <TextField label="Pattern Title"
            className={classes.textField}
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <TextField label="Pattern Notes/Information"
            className={classes.textField}
            name="info"
            value={info}
            onChange={this.handleChange}
            multiline
            rowsMax="10"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Create Pattern
          </Button>
        </form>

        <ProgressModal open={loading} />
        <ErrorSnackbar open={error} onClose={clearError}>
          Error creating pattern, please retry!
        </ErrorSnackbar>

      </React.Fragment>
    );
  }
};

PatternSetupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  createPattern: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default withStyles(styles)(PatternSetupForm);
