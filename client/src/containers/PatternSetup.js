import { connect } from 'react-redux';
import { createPattern } from 'actions';
import PatternSetupForm from 'components/PatternSetupForm';

const mapDispatchToProps = {
  createPattern: patternData => createPattern(patternData),
};

export default connect(null, mapDispatchToProps)(PatternSetupForm);
