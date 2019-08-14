import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const { createPattern, history } = this.props;
    const { title, info } = this.state;

    createPattern({ title, info });
    event.preventDefault();

    // history.push('/');
  }

  handleReset(event) {
    event.preventDefault();
  }

  render() {

    const { classes } = this.props;
      return (
        <React.Fragment>
          <ContentHeader>Pattern Setup</ContentHeader>
          <form
            onSubmit={this.handleSubmit}
            onReset={this.handleReset}
            className={classes.root}
          >
            <TextField label="Pattern Title"
              className={classes.textField}
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <TextField label="Pattern Notes/Information"
              className={classes.textField}
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
              multiline
              rowsMax="10"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit">
              Create Pattern
            </Button>
          </form>
        </React.Fragment>
      );
    }
  // }
};

PatternSetupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  createPattern: PropTypes.func.isRequired,
};

export default withStyles(styles)(PatternSetupForm);
