import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainContentWrapper from 'mui/MainContentWrapper';
import Header from 'components/Header';
import HomeScreen from 'components/HomeScreen';
import Login from 'components/Login';
import About from 'components/About';
import PatternContainer from 'containers/PatternContainer';
import PatternSetup from 'containers/PatternSetup';
import Navigation from 'containers/Navigation';

const App = () => {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const loggedIn = true;
  const navProps = { placeholder: !loggedIn, mobileOpen, handleDrawerToggle };

  return (
    <React.Fragment>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Route component={() => (<Navigation {...navProps} />)} />
      <MainContentWrapper>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={HomeScreen} />
          <Route path="/about" component={About} />
          <Route path="/patterns/new" component={PatternSetup} />
          <Route path="/patterns/:patternId" component={PatternContainer} />
          <Route component={HomeScreen}/>
        </Switch>
      </MainContentWrapper>
    </React.Fragment>
  )
};

export default App;
