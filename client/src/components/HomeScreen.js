import React from 'react';
import Hidden from 'material-ui/Hidden';
import PatternList from 'containers/PatternList';
import AddPattern from 'components/AddPattern';

const HomeScreen = () => (
  <React.Fragment>
    <PatternList />
    <Hidden xsDown>
      <AddPattern />
    </Hidden>
  </React.Fragment>
);

export default HomeScreen;
