import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { saveLoginState } from 'utils/localStorage';
import ProtectedRoute from 'components/ProtectedRoute';
import { getUserLoggedIn } from 'reducers';
import { updateLogin } from 'actions';
import MainContentWrapper from 'mui/MainContentWrapper';
import Header from 'components/Header';
import HomeScreen from 'components/HomeScreen';
import About from 'components/About';
import LoginPage from 'containers/LoginPage';
import PatternContainer from 'containers/PatternContainer';
import PatternSetup from 'containers/PatternSetup';
import Navigation from 'containers/Navigation';

const mapStateToProps = state => ({ loggedIn: getUserLoggedIn(state) });

const mapDispatchToProps = {
  logout: () => updateLogin(false)
};

const App = props => {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    saveLoginState(props.loggedIn);
  },
  [props.loggedIn]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const loggedIn = props.loggedIn;
  const navProps = { placeholder: !loggedIn, mobileOpen, handleDrawerToggle };

  const AppProtectedRoute = props => (
    <ProtectedRoute allow={loggedIn} redirectLink="/login" {...props} />
  );

  return (
    <React.Fragment>
      <Header
        handleDrawerToggle={handleDrawerToggle}
        loggedIn={loggedIn}
        logout={props.logout}
      />
      <Route component={() => (<Navigation {...navProps} />)} />
      <MainContentWrapper>
        <Switch>
          <Route exact path="/" component={LoginPage} />
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
