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
    width: '100%'
  },
  textField: {
    width: '100%',
  },
  submitButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
});

class PatternForm extends React.Component {

  state = (this.props.pattern ? {
    title: (this.props.pattern.title || ''),
    info: (this.props.pattern.info || ''),
    linkPattSource: (this.props.pattern.linkPattSource || ''),
    linkRavPatt: (this.props.pattern.linkRavPatt || ''),
    linkRavProj: (this.props.pattern.linkRavProj || ''),
  } : {
    title: '',
    info: '',
    linkPattSource: '',
    linkRavPatt: '',
    linkRavProj: '',
  });

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    const { pattern, onSubmit, history } = this.props;
    if (pattern) {
      onSubmit({...this.state, patternId: pattern.patternId });
      history.push(`/patterns/${pattern.patternId}`);
    }
    else
      onSubmit(this.state);
    event.preventDefault();
  };

  render() {

    const { classes, loading, error, clearError, pattern } = this.props;

    return (
      <>

        <ContentHeader>
          {pattern ? `Edit Pattern - ${pattern.title}` : 'New Pattern Setup'}
        </ContentHeader>
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
            rows="3"
            margin="dense"
            variant="filled"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submitButton}
            type="submit"
          >
            {pattern ? 'Update Pattern' : 'Create Pattern'}
          </Button>
          <Button color="primary">
            cancel
          </Button>
        </form>

        <ProgressModal open={loading} />
        <ErrorSnackbar open={error} onClose={clearError}>
          Error {pattern ? 'editing' : 'creating'} pattern, please retry!
        </ErrorSnackbar>

      </>
    );
  }
};

PatternForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  pattern: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(PatternForm);
