import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ allow, redirectLink, ...props }) => {

  if (allow)
    return (<Route {...props} />);

  return (<Redirect to={{ pathname: redirectLink }} />);

};

export default ProtectedRoute;
