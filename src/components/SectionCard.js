import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import classnames from 'classnames';

import SectionStatusContainer from 'containers/SectionStatusContainer';
import RowCounterContainer from 'containers/RowCounterContainer';

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 2}px 0`,
    display: 'flex',
    flexDirection: 'column',
  },
  staticTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  action: {
    margin: `0 ${theme.spacing.unit}px 0 0`,
  },
  sectionStatus: {
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  rowCounter: {
    paddingTop: 0,
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  hidden: {
/*    visibility: 'hidden',*/
  },
});


class SectionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  handleExpandClick = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  render() {
    const { title, sectionID, classes } = this.props;
    const { expanded } = this.state;

    const cardHeaderAction = (
      <IconButton
        className={classnames(
          classes.expand,
          { [classes.expandOpen]: expanded },
        )}
        onClick={this.handleExpandClick}
      >
        <ExpandMoreIcon />
      </IconButton>
    );

    const cardHeaderTitle = (
      <Typography type="title">{title}</Typography>
    )

    return(
      <Card className={classes.root}>
        <div className={classes.staticTop}>
          <CardHeader
            classes={{
              root: classes.header,
              action: classes.action,
            }}
            action={cardHeaderAction}
            title={cardHeaderTitle}
          />
          <CardContent
            className={classnames(
              classes.sectionStatus,
              { [classes.hidden]: expanded },
            )}
          >
            <SectionStatusContainer
              sectionID={sectionID}
              displayStyle={expanded ? '' : 'row fraction'}
            />
          </CardContent>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.rowCounter}>
            <RowCounterContainer sectionID={sectionID} />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
};

SectionCard.propTypes = {
  sectionID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionCard);
