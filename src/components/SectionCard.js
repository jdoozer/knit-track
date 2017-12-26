import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import classnames from 'classnames';

import SectionStatusContainer from 'containers/SectionStatusContainer';
import RowCounterContainer from 'containers/RowCounterContainer';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
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
    display: 'flex',
    flexDirection: 'row',
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
    return(
      <Card className={classes.root}>
        <div className={classes.staticTop}>
          <div className={classes.header}>
            <CardActions>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={expanded}
                aria-label="expand section"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <CardHeader title={title} className={classes.headerText} />
          </div>
          <CardContent>
            <SectionStatusContainer sectionID={sectionID} />
          </CardContent>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
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
