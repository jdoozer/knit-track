import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import DeleteIcon from 'material-ui-icons/Delete';
import SectionStatus from 'components/SectionStatus';
import RowCounterContainer from 'containers/RowCounterContainer';
import ActionIconButton from 'components/ActionIconButton';

const styles = theme => ({
  titleColumn: {
    flex: '2 1 80%',
  },
  heading: {
    textAlign: 'left',
  },
  statusColumn: {
    flex: '1 1 20%',
    minWidth: 125,
  },
  summary: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing.unit,
  },
  button: {
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
});


class SectionPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleExpandClick = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  render() {
    const { section, deleteSection, patternId, classes } = this.props;
    const { expanded } = this.state;

    const { title, sectionId, currentRow, numRows, rowIds } = section;

    return (
      <ExpansionPanel onChange={this.handleExpandClick}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.summary}
        >
          <div className={classes.titleColumn}>
            <Typography variant="title" className={classes.heading}>{title}</Typography>
          </div>
          <div className={classes.statusColumn}>
            <SectionStatus
              currentRow={currentRow}
              numRows={numRows}
              displayStyle={expanded ? '' : 'fraction'}
            />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <RowCounterContainer
            currentRow={currentRow}
            sectionId={sectionId}
            rowIds={rowIds}
          />
          <ActionIconButton
            className={classes.button}
            onClick={() => deleteSection(patternId, sectionId, rowIds)}
            icon={<DeleteIcon />}
            dialogTitle="Delete Section"
            dialogText="Are you sure you want to delete this section and all its contents?"
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
};

SectionPanel.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sectionId: PropTypes.string.isRequired,
    currentRow: PropTypes.number.isRequired,
    numRows: PropTypes.number.isRequired,
    rowIds: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionPanel);
