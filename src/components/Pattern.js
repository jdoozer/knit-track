import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ContentHeader from 'components/ContentHeader';
import SectionCard from 'components/SectionCard';
import AddSection from 'containers/AddSection';

const styles = (theme) => ({
  info: {
    textAlign: 'left',
    margin: theme.spacing.unit * 3,
  },
  sectionCards: {
    margin: theme.spacing.unit * 3,
  },
});

const Pattern = ({ pattern, sections, classes }) => {
  if (pattern == null) {
    return (
      <ContentHeader>No pattern selected!</ContentHeader>
    );
  } else {
    return(
      <div>
        <ContentHeader>{pattern.title}</ContentHeader>
        <Typography type="subheading" className={classes.info}>
          {pattern.info}
        </Typography>
        <div className={classes.sectionCards}>
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
    patternID: PropTypes.string.isRequired,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionID: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pattern);
