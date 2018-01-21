import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Hidden from 'material-ui/Hidden';

import MainContentWrapper from 'muiwrappers/MainContentWrapper';
import Header from 'components/Header';
import PatternListContainer from 'containers/PatternListContainer';
import PatternContainer from 'containers/PatternContainer';
import AddPattern from 'containers/AddPattern';
import SectionSetupContainer from 'containers/SectionSetupContainer';

const App = () => (
  <Router>
    <div>

      <Header />

      <MainContentWrapper>

        <Route exact path="/" component={PatternListContainer} />
        <Hidden xsDown>
          <Route exact path="/" component={AddPattern} />
        </Hidden>

        <Route path="/pattern" component={PatternContainer} />

        <Route path="/section" component={SectionSetupContainer} />

      </MainContentWrapper>

    </div>
  </Router>
);

export default App;
