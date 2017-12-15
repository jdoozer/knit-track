import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Header from 'components/Header';
import PatternListContainer from 'containers/PatternListContainer';
import PatternContainer from 'containers/PatternContainer';
import AddPattern from 'containers/AddPattern';
import SectionSetupContainer from 'containers/SectionSetupContainer';

const App = () => (
  <Router>
    <div className="App">

      <Header />

      <Route exact path="/" component={PatternListContainer} />
      <Route exact path="/" component={AddPattern} />

      <Route path="/pattern" component={PatternContainer} />

      <Route path="/section" component={SectionSetupContainer} />

    </div>
  </Router>
);

export default App;
