import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';
import ListLinkBlock from 'components/ListLinkBlock';
import MessageBlock from 'components/MessageBlock';


const styles = theme => ({
  list: {
    padding: 0,
  },
});

const PatternListItems = ({ patterns, loading, classes, error }) => {

  if (loading) {
    return (<div><CircularProgress /></div>)
  }

  if (error) {
    return (
      <MessageBlock>
        An error occurred while fetching data. Please reload to try again.
      </MessageBlock>
    )
  }

  if (patterns.length) {
    return (
      <List className={classes.list}>
        {patterns.map(pattern => (
          <React.Fragment key={pattern.patternId}>
            <ListLinkBlock
              link={`/patterns/${pattern.patternId}`}
              title={pattern.title}
            />
            <Divider />
          </React.Fragment>
        ))}
      </List>
    )
  }

  return (
    <MessageBlock className={classes.message}>
       No patterns created yet! Click the button below to add a new pattern.
    </MessageBlock>
  )

};

PatternListItems.propTypes = {
  patterns: PropTypes.arrayOf(
    PropTypes.shape({
      patternId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default withStyles(styles)(PatternListItems);
