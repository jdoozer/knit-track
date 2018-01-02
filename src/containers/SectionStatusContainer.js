import { connect } from 'react-redux';
import SectionStatus from 'components/SectionStatus';

const mapStateToProps = (state, ownProps) => {
  const { sectionID, ...passThruProps } = ownProps;
  const section = state.sections.byID[sectionID];

  return ({
    section,
    ...passThruProps
  });

};

export default connect(mapStateToProps)(SectionStatus);
