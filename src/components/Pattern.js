import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';

import ContentHeader from 'components/ContentHeader';
import SectionCard from 'components/SectionCard';
import AddSection from 'containers/AddSection';

const styles = (theme) => ({
  root: {
    paddingBottom: 1,
  },
  info: {
    textAlign: 'left',
    margin: theme.spacing.unit * 3,
  },
  sectionCards: {
    margin: theme.spacing.unit * 3,
  },
});

const Pattern = ({ pattern, sections, deletePattern, classes }) => {
  if (pattern == null) {
    return (
      <ContentHeader>No pattern selected!</ContentHeader>
    );
  } else {
    return(
      <div className={classes.root}>
        <ContentHeader
          onClick={() => deletePattern(pattern.patternId)}
          icon={<DeleteIcon />}
          newLocation='/'
        >
          {pattern.title}
        </ContentHeader>
        <Typography type="subheading" className={classes.info}>
          {pattern.info}
        </Typography>
        <div className={classes.sectionCards}>
          {sections.map(section => (
            <SectionCard
              key={section.sectionId}
              section={section}
            />
          ))}
        </div>
        <Hidden smDown>
          <AddSection patternId={pattern.patternId} />
        </Hidden>
      </div>
    );
  }
};

Pattern.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    patternId: PropTypes.string.isRequired,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionId: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pattern);
