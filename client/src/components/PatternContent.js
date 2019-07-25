import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import { CircularProgress } from 'material-ui/Progress';
import ContentHeader from 'components/ContentHeader';
import SectionPanel from 'components/SectionPanel';
import AddSection from 'components/AddSection';

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
  message: {
    padding: theme.spacing.unit * 2,
  }
});

const MessageBlock = ({ classes, children }) => (
  <Typography variant="subheading" className={classes.message}>
    {children}
  </Typography>
);

const PatternContent = ({
  pattern, sections,
  deletePattern, deleteSection,
  loading, error, classes
}) => {

  let mainContent;

  if (loading) {
    mainContent = (
      <div className={classes.root}><CircularProgress /></div>
    );
  }
  else if (error) {
    mainContent = (
      <MessageBlock classes={classes}>
        An error occurred while fetching data. Please reload to try again.
      </MessageBlock>
    );
  }
  else if (pattern === null) {
    mainContent = (
      <MessageBlock classes={classes}>
        Pattern ID is invalid
      </MessageBlock>
    );
  }
  else {
    const sectionContent = sections.map(section => (
      <SectionPanel
        key={section.sectionId}
        section={section}
        deleteSection={deleteSection}
        patternId={pattern.patternId}
      />
    ));

    mainContent =  (
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
        <Typography variant="subheading" className={classes.info}>
          {pattern.info}
        </Typography>
        <div className={classes.sectionCards}>
          {sectionContent}
        </div>
        <Hidden xsDown>
          <AddSection patternId={pattern.patternId} />
        </Hidden>
      </div>
    )
  }

  return mainContent;

};

PatternContent.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string,
    info: PropTypes.string,
    patternId: PropTypes.string.isRequired,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionId: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  deletePattern: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default withStyles(styles)(PatternContent);
