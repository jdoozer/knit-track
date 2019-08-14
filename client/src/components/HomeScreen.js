import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import PatternList from 'containers/PatternList';
import AddPattern from 'components/AddPattern';
import ContentHeader from 'components/ContentHeader';

const HomeScreen = () => (
  <React.Fragment>
    <ContentHeader>Pattern List</ContentHeader>
    <PatternList />
    <Hidden xsDown>
      <AddPattern />
    </Hidden>
  </React.Fragment>
);

export default HomeScreen;
