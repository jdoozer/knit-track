import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainContentWrapper from 'muiwrappers/MainContentWrapper';

import Header from 'components/Header';
import PatternListContainer from 'containers/PatternListContainer';
import PatternContainer from 'containers/PatternContainer';
import AddPattern from 'containers/AddPattern';
import SectionSetupContainer from 'containers/SectionSetupContainer';

const App = () => (
  <Router>
    <div className="App">

      <Header />

      <MainContentWrapper>

        <Route exact path="/" component={PatternListContainer} />
        <Route exact path="/" component={AddPattern} />

        <Route path="/pattern" component={PatternContainer} />

        <Route path="/section" component={SectionSetupContainer} />

      </MainContentWrapper>

    </div>
  </Router>
);

export default App;
