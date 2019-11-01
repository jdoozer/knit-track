import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import DeletePattern from 'containers/DeletePattern';
import ContentHeader from 'components/ContentHeader';
import Section from 'containers/Section';
import AddSection from 'components/AddSection';

const styles = theme => ({
  root: {
  },
  info: {
    textAlign: 'left',
    margin: theme.spacing(3),
  },
  links: {
    margin: theme.spacing(3),
    marginBottom: (({ pattern }) => pattern.info ? 0 : theme.spacing(3)),
    '& span::after': {
      content: `' | '`,
    },
    '& span:last-child::after': {
      content: `''`,
    },
  },
  sectionCards: {
    margin: `0 ${theme.spacing(3)}px`,
    width: '100%'
  },
});

const Pattern = ({ pattern, classes }) => {

  const {
    patternId, title, info, linkPattSource, linkRavPatt, linkRavProj, sectionIds
  } = pattern;

  let linkBlock = [];
  if (linkPattSource) {
    linkBlock.push(<span key="pattSource">
      <Link href={linkPattSource}>Pattern Source</Link>
    </span>);
  }
  if (linkRavPatt) {
    linkBlock.push(<span key="ravPatt">
      <Link href={linkRavPatt}>Ravelry Pattern</Link>
    </span>);
  }
  if (linkRavProj) {
    linkBlock.push(<span key="ravProj">
      <Link href={linkRavProj}>Ravelry Project</Link>
    </span>);
  }

  return (<React.Fragment>

    <ContentHeader iconButton={(<DeletePattern patternId={patternId} />)}>
      {title}
    </ContentHeader>

    {(linkBlock.length > 0) && (
      <Typography variant="subtitle1" className={classes.links}>
        {linkBlock}
      </Typography>
    )}

    {info && (<Typography variant="subtitle1" className={classes.info}>
      {info}
    </Typography>)}

    <span className={classes.sectionCards}>
      {sectionIds.map(id => <Section key={id} sectionId={id} />)}
    </span>

    <AddSection patternId={patternId} />

  </React.Fragment>);
};

Pattern.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string,
    patternId: PropTypes.string.isRequired,
    sectionIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pattern);
