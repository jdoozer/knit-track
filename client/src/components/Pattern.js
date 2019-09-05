import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import DeletePattern from 'containers/DeletePattern';
import ContentHeader from 'components/ContentHeader';
import Section from 'containers/Section';
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

const Pattern = ({
  pattern: { patternId, title, info, sectionIds }, classes
}) => (

  <div className={classes.root}>

    <ContentHeader button={(<DeletePattern patternId={patternId} />)}>
      {title}
    </ContentHeader>

    <Typography variant="subtitle1" className={classes.info}>
      {info}
    </Typography>

    <div className={classes.sectionCards}>
      {sectionIds.map(id => <Section key={id} sectionId={id} />)}
    </div>

    <Hidden xsDown>
      <AddSection patternId={patternId} />
    </Hidden>

  </div>

);

Pattern.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    patternId: PropTypes.string.isRequired,
    sectionIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pattern);
