import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { subscribePatternList, clearError } from 'actions';
import { getPatternTitlesSorted, getPatternsLoading, getPatternsError } from 'reducers';
// import ProgressModal from 'components/ProgressModal';
import ErrorSnackbar from 'components/ErrorSnackbar';
import NavDrawer from 'components/NavDrawer';

const mapStateToProps = state => ({
  patternTitles: getPatternTitlesSorted(state),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsError(state)),
});

const mapDispatchToProps = {
  subscribePatternList,
  clearError: () => clearError('patterns')
};

class Navigation extends React.Component {

  componentDidMount() {
    if (!this.props.placeholder)
      this.props.subscribePatternList(true);
  }

  componentWillUnmount() {
    this.props.subscribePatternList(false);
  }

  render() {

    const {
      loading, error, patternTitles, placeholder, mobileOpen, handleDrawerToggle
    } = this.props;

    return (
      <>
        <NavDrawer
          placeholder={placeholder}
          patternTitles={patternTitles}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          loadingPatterns={loading}
        />
        <ErrorSnackbar open={error && !loading} onClose={clearError}>
          Error loading patterns!
        </ErrorSnackbar>
      </>
    );
  }
}

Navigation.propTypes = {
  patternTitles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  subscribePatternList: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  placeholder: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
