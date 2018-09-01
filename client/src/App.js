import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Hidden from 'material-ui/Hidden';
import Reboot from 'material-ui/Reboot';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainContentWrapper from 'mui/MainContentWrapper';
import theme from 'mui/knitTrackTheme';

import Header from 'components/Header';
import PatternList from 'containers/PatternList';
import Pattern from 'containers/Pattern';
import AddPattern from 'containers/AddPattern';
import SectionSetup from 'containers/SectionSetup';

// import TestAPIComponent from 'TestAPIComponent';

const App = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Reboot />

      <Header />

      <MainContentWrapper>

        <Route exact path="/" component={PatternList} />
        <Hidden xsDown>
          <Route exact path="/" component={AddPattern} />
        </Hidden>

        <Route path="/pattern" component={Pattern} />

        <Route path="/section" component={SectionSetup} />

      </MainContentWrapper>

    </MuiThemeProvider>
  </Router>
);

export default App;
