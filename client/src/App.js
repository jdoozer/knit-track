import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Reboot from 'material-ui/Reboot';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainContentWrapper from 'mui/MainContentWrapper';
import theme from 'mui/knitTrackTheme';

import Header from 'components/Header';
import HomeScreen from 'components/HomeScreen';

import Pattern from 'containers/Pattern';
import SectionSetup from 'containers/SectionSetup';
import PatternSetup from 'containers/PatternSetup';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Reboot />

    <Header />

    <MainContentWrapper>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/patterns/new" component={PatternSetup} />
        <Route path="/patterns/:patternId/newsection" component={SectionSetup} />
        <Route path="/patterns/:patternId" component={Pattern} />
        <Route component={HomeScreen}/>
      </Switch>
    </MainContentWrapper>

  </MuiThemeProvider>
);

export default App;
