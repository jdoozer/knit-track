import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import SectionStatus from 'components/SectionStatus';
import RowCounterContainer from 'containers/RowCounterContainer';

const styles = theme => ({
  titleColumn: {
    flex: '2 1 80%',
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
  rowCounter: {
    paddingTop: 0,
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  details: {
    display: 'flex',
    alignItems: 'column',
    justifyContent: 'center'
  },
  heading: {
    textAlign: 'left',
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
    const { section, classes } = this.props;
    const { expanded } = this.state;

    const { title, sectionId, currentRow, numRows, rows } = section;

    return (
      <ExpansionPanel onChange={this.handleExpandClick}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.summary}
        >
          <div className={classes.titleColumn}>
            <Typography type="title" className={classes.heading}>{title}</Typography>
          </div>
          <div className={classes.statusColumn}>
            <SectionStatus
              currentRow={currentRow}
              numRows={numRows}
              displayStyle={expanded ? "" : "fraction"}
            />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <RowCounterContainer
            currentRow={currentRow}
            sectionId={sectionId}
            rows={rows}
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
    rows: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionPanel);
