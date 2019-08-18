import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ContentHeader from 'components/ContentHeader';
import SectionPanel from 'components/SectionPanel';
import AddSection from 'components/AddSection';

const styles = (theme) => ({
  root: {
    paddingBottom: 1,
  },
  info: {
    textAlign: 'left',
    margin: theme.spacing(3),
  },
  sectionCards: {
    margin: theme.spacing(3),
  },
});

const PatternContent = ({
  pattern, sections,
  deletePattern, deleteSection,
  classes
}) => (

  <div className={classes.root}>

    <ContentHeader
      onClick={() => deletePattern(pattern.patternId)}
      icon={<DeleteIcon />}
      newLocation="/"
      dialogTitle="Delete Pattern"
      dialogText="Are you sure you want to delete this pattern and all its contents?"
    >
      {pattern.title}
    </ContentHeader>

    <Typography variant="subtitle1" className={classes.info}>
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

PatternContent.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string,
    info: PropTypes.string,
    patternId: PropTypes.string,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionId: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  deletePattern: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatternContent);
