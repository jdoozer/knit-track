import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ProgressModal from 'components/ProgressModal';
import ErrorSnackbar from 'components/ErrorSnackbar';
import ContentHeader from 'components/ContentHeader';

const styles = theme => ({
  form: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 330,
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
    linkPattSource: '',
    linkRavPatt: '',
    linkRavProj: '',
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    this.props.createPattern(this.state);
    event.preventDefault();
  };

  render() {

    const { classes, loading, error, clearError } = this.props;

    return (
      <>

        <ContentHeader>Pattern Setup</ContentHeader>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <TextField label="Pattern Title"
            className={classes.textField}
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            margin="dense"
            variant="filled"
          />
          <TextField label="Link: Pattern Source"
            className={classes.textField}
            name="linkPattSource"
            value={this.state.linkPattSource}
            onChange={this.handleChange}
            margin="dense"
            variant="filled"
          />
          <TextField label="Link: Pattern Ravelry Page"
            className={classes.textField}
            name="linkRavPatt"
            value={this.state.linkRavPatt}
            onChange={this.handleChange}
            margin="dense"
            variant="filled"
          />
          <TextField label="Link: Project Ravelry Page"
            className={classes.textField}
            name="linkRavProj"
            value={this.state.linkRavProj}
            onChange={this.handleChange}
            margin="dense"
            variant="filled"
          />
          <TextField label="Pattern Notes/Information"
            className={classes.textField}
            name="info"
            value={this.state.info}
            onChange={this.handleChange}
            multiline
            rowsMax="10"
            margin="dense"
            variant="filled"
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

      </>
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
