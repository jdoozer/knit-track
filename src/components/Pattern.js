import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import ContentHeader from 'components/ContentHeader';
import SectionPanel from 'components/SectionPanel';
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

const Pattern = ({ pattern, sections, rowIds, deletePattern, deleteSection, classes, history }) => {
  if (pattern == null) {
    history.push('/');
    return;
  } else {
    return(
      <div className={classes.root}>
        <ContentHeader
          onClick={() => deletePattern(pattern.patternId, pattern.sections, rowIds)}
          icon={<DeleteIcon />}
          newLocation="/"
          dialogTitle="Delete Pattern"
          dialogText="Are you sure you want to delete this pattern and all its contents?"
        >
          {pattern.title}
        </ContentHeader>
        <Typography variant="subheading" className={classes.info}>
          {pattern.info}
        </Typography>
        <div className={classes.sectionCards}>
        {sections.map(section => (
          <SectionPanel
            key={section.sectionId}
            section={section}
            deleteSection={deleteSection}
            patternId={pattern.patternId}
          />
        ))}
        </div>
        <Hidden xsDown>
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
