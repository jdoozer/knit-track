import { connect } from 'react-redux';
import SectionStatus from 'components/SectionStatus';

const mapStateToProps = (state, ownProps) => {
  const { sectionID } = ownProps;
  const section = state.sections.byID[sectionID];

  return ({ section });

};

export default connect(mapStateToProps)(SectionStatus);
