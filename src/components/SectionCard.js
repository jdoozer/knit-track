import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import classnames from 'classnames';

import RowCounterContainer from 'containers/RowCounterContainer';


const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 210,
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    textAlign: 'left',
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
  flexGrow: {
    flex: '1 1 auto',
  },
  counterPad: {
    marginTop: 100
  }
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
      <Card className={classes.card}>
        <CardHeader className={classes.header} title={title} />
        <RowCounterContainer
          sectionID={sectionID}
          dynamic={expanded}
          className={classnames(classes.counter, {
            [classes.counterPad]: expanded,
          })}
        />
        <CardActions disableActionSpacing>
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
      </Card>
    );
  }
};

SectionCard.propTypes = {
  sectionID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(SectionCard);
