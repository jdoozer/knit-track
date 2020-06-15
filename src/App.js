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
import SectionContainer from 'containers/SectionContainer';
import PatternSetup from 'containers/PatternSetup';
import Navigation from 'containers/Navigation';
import ErrorBoundary from 'components/ErrorBoundary';

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
  const routeProps = { allow: loggedIn, redirectLink: "/login" };

  return (
    <ErrorBoundary>
      <Header
        handleDrawerToggle={handleDrawerToggle}
        loggedIn={loggedIn}
        logout={logout}
      />
      <Navigation {...navProps} />
      <MainContentWrapper>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute path="/home" component={HomeScreen} {...routeProps} />
          <ProtectedRoute path="/about" component={About} {...routeProps} />
          <ProtectedRoute
            path="/patterns/new"
            component={PatternSetup}
            {...routeProps}
          />
          <ProtectedRoute
            path="/patterns/:patternId"
            component={PatternContainer}
            {...routeProps}
          />
          <ProtectedRoute
            path="/sections/:sectionId"
            component={SectionContainer}
            {...routeProps}
          />
          <ProtectedRoute component={HomeScreen} {...routeProps} />
        </Switch>
      </MainContentWrapper>
    </ErrorBoundary>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
