import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/Button';

const styles = theme => ({
  root: {
    minWidth: 0,
    padding: theme.spacing.unit,
  },
});

class HeaderAction extends React.Component {

  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    const { buttonProps, history } = this.props;

    buttonProps.onClick();

    event.preventDefault();
    history.push(buttonProps.newLocation);
  }

  render() {
    const { classes, buttonProps } = this.props;
    return (
      <IconButton color="inherit" className={classes.root} onClick={this.handleButtonClick}>
        {buttonProps.icon}
      </IconButton>
    );
  }

};

HeaderAction.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  buttonProps: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(HeaderAction));
