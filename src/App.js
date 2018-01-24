import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Hidden from 'material-ui/Hidden';
import Reboot from 'material-ui/Reboot';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainContentWrapper from 'mui/MainContentWrapper';
import theme from 'mui/knitTrackTheme';

import Header from 'components/Header';
import PatternListContainer from 'containers/PatternListContainer';
import PatternContainer from 'containers/PatternContainer';
import AddPattern from 'containers/AddPattern';
import SectionSetupContainer from 'containers/SectionSetupContainer';


const App = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Reboot />

      <Header />

      <MainContentWrapper>

        <Route exact path="/" component={PatternListContainer} />
        <Hidden xsDown>
          <Route exact path="/" component={AddPattern} />
        </Hidden>

        <Route path="/pattern" component={PatternContainer} />

        <Route path="/section" component={SectionSetupContainer} />

      </MainContentWrapper>

    </MuiThemeProvider>
  </Router>
);

export default App;
