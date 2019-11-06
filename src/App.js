import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { saveLoginState } from 'utils/localStorage';
import { getUserLoggedIn } from 'reducers';
import { updateLogin } from 'actions';
import ProtectedRoute from 'components/ProtectedRoute';
import MainContentWrapper from 'components/MainContentWrapper';
import Header from 'components/Header';
import HomeScreen from 'components/HomeScreen';
import About from 'components/About';
import LoginPage from 'containers/LoginPage';
import PatternContainer from 'containers/PatternContainer';
import PatternSetup from 'containers/PatternSetup';
import Navigation from 'containers/Navigation';

const mapStateToProps = state => ({
  loggedIn: getUserLoggedIn(state)
});

const mapDispatchToProps = {
  logout: () => updateLogin(false)
};

const App = ({ loggedIn, logout }) => {

  useEffect(() => saveLoginState(loggedIn), [loggedIn]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navProps = { placeholder: !loggedIn, mobileOpen, handleDrawerToggle };

  const AppProtectedRoute = props => (
    <ProtectedRoute allow={loggedIn} redirectLink="/login" {...props} />
  );

  return (
    <React.Fragment>
      <Header
        handleDrawerToggle={handleDrawerToggle}
        loggedIn={loggedIn}
        logout={logout}
      />
      <Route component={() => (<Navigation {...navProps} />)} />
      <MainContentWrapper>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <AppProtectedRoute path="/home" component={HomeScreen} />
          <AppProtectedRoute path="/about" component={About} />
          <AppProtectedRoute path="/patterns/new" component={PatternSetup} />
          <AppProtectedRoute path="/patterns/:patternId" component={PatternContainer} />
          <AppProtectedRoute component={HomeScreen} />
        </Switch>
      </MainContentWrapper>
    </React.Fragment>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
