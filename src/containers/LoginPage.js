import React from 'react';
import { connect } from 'react-redux';
import { updateLogin } from 'actions';
import LoginForm from 'components/LoginForm';

const mapDispatchToProps = {
  login: () => updateLogin(true)
};

const LoginPage = props => (
  <LoginForm onClick={props.login} />
);

export default connect(null, mapDispatchToProps)(LoginPage);
