import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import SectionCard from 'components/SectionCard';
import AddSection from 'containers/AddSection';

const styles = (theme) => ({
  info: {
    textAlign: 'left',
    marginTop: theme.spacing.unit * 2,
  }
});

const Pattern = ({ pattern, sections, classes }) => {
  if (pattern == null) {
    return (
      <Typography type="title">No pattern selected!</Typography>
    );
  } else {
    return(
      <div>
        <Typography type="title">{pattern.title}</Typography>
        <Typography type="subheading" className={classes.info}>
          {pattern.info}
        </Typography>
        <div>
          {sections.map(section => (
            <SectionCard
              key={section.sectionID}
              {...section}
            />
          ))}
        </div>
        <AddSection patternID={pattern.patternID} />
      </div>
    );
  }
};

Pattern.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionID: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default withStyles(styles)(Pattern);
