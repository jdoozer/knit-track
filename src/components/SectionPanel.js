import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditRounded';
import CopyIcon from '@material-ui/icons/FileCopyRounded';
import TotalRows from 'components/TotalRows';
import CurrentRowSmall from 'components/CurrentRowSmall';
import RowCounter from 'components/RowCounter';
import DeleteSection from 'containers/DeleteSection';

const styles = theme => ({
  titleColumn: {
    flex: '2 1 80%',
    marginRight: theme.spacing(2),
  },
  heading: {
    textAlign: 'left',
  },
  statusColumn: {
    flex: '1 1 20%',
    minWidth: 125,
  },
  summary: {
    '& div': {
      alignItems: 'center',
    }
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  button: {
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
});

const EditLink = sectionId => forwardRef((props, ref) => (
  <Link innerRef={ref} to={`/sections/${sectionId}/edit`} {...props} />
));

const CopyLink = sectionId => React.forwardRef((props, ref) => (
  <Link innerRef={ref} to={`/sections/${sectionId}/copy`} {...props} />
));

const SectionPanel = (props) => {

  const [expanded, setExpanded] = useState(false);

  const {
    section: {
      title, currentRow, numRows, sectionId, rows,
      loading, error, lastActionType
    },
    updateRowCount, classes
  } = props;

  return (
    <ExpansionPanel onChange={() => setExpanded(expanded => !expanded)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.summary}
      >
        <div className={classes.titleColumn}>
          <Typography variant="h6" className={classes.heading}>
            {title}
          </Typography>
        </div>
        <div className={classes.statusColumn}>
          {
            expanded
              ? <TotalRows numRows={numRows} />
              : <CurrentRowSmall
                  currentRow={currentRow}
                  final={currentRow===numRows}
                />
          }
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {
          expanded
          && (<>
            <RowCounter
              currentRow={currentRow}
              max={numRows}
              rows={rows || {}}
              error={Boolean(error) && lastActionType==='updateRowCount'}
              loading={loading  && lastActionType==='updateRowCount'}
              updateRowCount={type => updateRowCount(sectionId, type)}
            />
            <div className={classes.button}>
              <IconButton color="inherit" key="edit" component={EditLink(sectionId)}>
                <EditIcon />
              </IconButton>
              <IconButton color="inherit" key="copy" component={CopyLink(sectionId)}>
                <CopyIcon />
              </IconButton>
              <DeleteSection sectionId={sectionId} />
            </div>
          </>)
        }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

SectionPanel.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    currentRow: PropTypes.number.isRequired,
    numRows: PropTypes.number.isRequired,
  }).isRequired,
  updateRowCount: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionPanel);
