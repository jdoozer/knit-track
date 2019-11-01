import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainContentWrapper from 'mui/MainContentWrapper';
import Header from 'components/Header';
import HomeScreen from 'components/HomeScreen';
import Login from 'components/Login';
import About from 'components/About';
import PatternContainer from 'containers/PatternContainer';
import PatternSetup from 'containers/PatternSetup';
import NavMenu from 'containers/NavMenu';

const App = () => {
  const loggedIn = true;
  const navProps = { placeholder: !loggedIn};

  return (
    <React.Fragment>
      <Header />
      <Route component={() => (<NavMenu {...navProps} />)} />
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
