import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import DeleteIconButton from 'components/DeleteIconButton';
import ContentHeader from 'components/ContentHeader';
import SectionPanel from 'components/SectionPanel';
import AddSection from 'components/AddSection';

const styles = theme => ({
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
  pattern: { patternId, title, info },
  sections, deletePattern, deleteSection, updateRowCount, classes
}) => (

  <div className={classes.root}>

    <ContentHeader
      button={(<DeleteIconButton
        onClick={() => deletePattern(patternId)}
        dataType="pattern"
      />)}
    >
      {title}
    </ContentHeader>

    <Typography variant="subtitle1" className={classes.info}>
      {info}
    </Typography>

    <div className={classes.sectionCards}>
      {sections.map(section => (
        <SectionPanel
          key={section.sectionId}
          section={section}
          onRowCounterClick={updateType => (
            updateRowCount(section.sectionId, updateType)
          )}
          onDeleteClick={() => deleteSection(section.sectionId)}
        />
      ))}
    </div>

    <Hidden xsDown>
      <AddSection patternId={patternId} />
    </Hidden>

  </div>

);

PatternContent.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    patternId: PropTypes.string.isRequired,
  }).isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionId: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  deletePattern: PropTypes.func.isRequired,
  updateRowCount: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatternContent);
