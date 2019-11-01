import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPatterns, clearError } from 'actions';
import { getPatternTitlesSorted, getPatternsLoading, getPatternsError } from 'reducers';
import ProgressModal from 'components/ProgressModal';
import ErrorSnackbar from 'components/ErrorSnackbar';
import NavDrawer from 'components/NavDrawer';

const mapStateToProps = state => ({
  patternTitles: getPatternTitlesSorted(state),
  loading: getPatternsLoading(state),
  error: Boolean(getPatternsError(state)),
  lastActionType: 'loadPatterns' //TODO: set this thru action/reducer
});

const mapDispatchToProps = {
  fetchPatterns,
  clearError: () => clearError(['patterns'])
};

class Navigation extends React.Component {

  componentDidMount() {
    if (!this.props.placeholder)
      this.props.fetchPatterns(true);
  }

  componentWillUnmount() {
    if (!this.props.placeholder)
      this.props.fetchPatterns(false);
  }

  render() {

    const {
      loading, error, patternTitles, placeholder, lastActionType, mobileOpen,
      handleDrawerToggle
    } = this.props;

    let placeholderProp = placeholder;
    if (!(patternTitles && patternTitles.length) || loading || error) {
      placeholderProp = true;
    }

    return (
      <React.Fragment>
        <ProgressModal open={loading && lastActionType==='loadPatterns'} />

        <ErrorSnackbar
          open={error && !loading && lastActionType==='loadPatterns'}
          onClose={clearError}
        >
          Error loading patterns
        </ErrorSnackbar>

        <NavDrawer
          placeholder={placeholderProp}
          patternTitles={patternTitles}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

      </React.Fragment>
    );
  }
}

Navigation.propTypes = {
  patternTitles: PropTypes.array.isRequired,
  fetchPatterns: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
