import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { subscribePatternList, clearError } from 'actions';
import {
  getPatternTitlesSorted, getPatternsLoading, getPatternsError, getPatternsLastAction,
} from 'reducers';
import ErrorSnackbar from 'components/ErrorSnackbar';
import NavDrawer from 'components/NavDrawer';

const mapStateToProps = state => ({
  patternTitles: getPatternTitlesSorted(state),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsError(state)),
  lastActionType: getPatternsLastAction(state),
});

const mapDispatchToProps = {
  subscribePatternList,
  clearError: () => clearError('patterns')
};


const Navigation = (props) => {

  const {
    loading,
    error,
    lastActionType,
    patternTitles,
    placeholder,
    mobileOpen,
    handleDrawerToggle,
    subscribePatternList,
    clearError
  } = props;

  useEffect(() => {
    if (!placeholder)
      subscribePatternList(true);
    return (() => {
      subscribePatternList(false);
    });
  }, [placeholder, subscribePatternList]);

  return (
    <>
      <NavDrawer
        placeholder={placeholder}
        patternTitles={patternTitles}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        loadingPatterns={loading}
      />
      <ErrorSnackbar
        open={error && !loading && lastActionType==='loadPatternList'}
        onClose={clearError}
      >
        Error loading patterns!
      </ErrorSnackbar>
    </>
  );
}

Navigation.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  patternTitles: PropTypes.array.isRequired,
  placeholder: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  subscribePatternList: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
