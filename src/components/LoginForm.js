import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const LoginLink = () => React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/home" {...props} />
));

const LoginForm = props => (
  <div>
    <p>Login form will go here, here's a dummy button:</p>
    <Button
      variant="contained"
      color="primary"
      onClick={props.onClick}
      component={LoginLink()}
    >
      login
    </Button>
  </div>
);

LoginForm.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default LoginForm;
