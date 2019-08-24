import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TotalRows from 'components/TotalRows';
import CurrentRowSmall from 'components/CurrentRowSmall';
import RowCounter from 'components/RowCounter';
import DeleteSection from 'components/DeleteSection';

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


class SectionPanel extends React.Component {

  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  render() {
    const {
      section: { title, currentRow, numRows, sectionId, loading, error, rows },
      deleteSection, updateRowCount, clearError, classes
    } = this.props;
    const { expanded } = this.state;

    return (
      <ExpansionPanel onChange={this.handleExpandClick}>
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
              expanded ?
              (<TotalRows numRows={numRows} />) :
              (<CurrentRowSmall currentRow={currentRow} />)
            }
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          {expanded && (<React.Fragment>
            <RowCounter
              currentRow={currentRow}
              rows={rows}
              error={Boolean(error)}
              loading={loading}
              onClick={updateType => updateRowCount(sectionId, updateType)}
            />
            <div className={classes.button}>
              <DeleteSection
                loading={loading}
                error={Boolean(error)}
                onClick={() => deleteSection(sectionId)}
                clearError={() => clearError(['sections'], sectionId)}
              />
            </div>
          </React.Fragment>)}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
};

SectionPanel.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    currentRow: PropTypes.number.isRequired,
    numRows: PropTypes.number.isRequired,
  }).isRequired,
  deleteSection: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  updateRowCount: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionPanel);
