import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditRounded';
import CopyIcon from '@material-ui/icons/FileCopyRounded';
import DeletePattern from 'containers/DeletePattern';
import ContentHeader from 'components/ContentHeader';
import SectionContainer from 'containers/SectionContainer';
import AddSection from 'components/AddSection';

const styles = theme => ({
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

  const EditLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} to={`/patterns/${patternId}/edit`} {...props} />
  ));

  const CopyLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} to={`/patterns/${patternId}/copy`} {...props} />
  ));

  let linkBlock = [];
  if (linkPattSource) {
    linkBlock.push(<span key="pattSource">
      <MuiLink href={linkPattSource}>Pattern Source</MuiLink>
    </span>);
  }
  if (linkRavPatt) {
    linkBlock.push(<span key="ravPatt">
      <MuiLink href={linkRavPatt}>Ravelry Pattern</MuiLink>
    </span>);
  }
  if (linkRavProj) {
    linkBlock.push(<span key="ravProj">
      <MuiLink href={linkRavProj}>Ravelry Project</MuiLink>
    </span>);
  }

  return (<>

    <ContentHeader iconButton={[
      (<IconButton color="inherit" key="edit" component={EditLink}>
        <EditIcon />
      </IconButton>),
      (<IconButton color="inherit" key="copy" component={CopyLink}>
        <CopyIcon />
      </IconButton>),
      (<DeletePattern patternId={patternId} key="delete" />)
    ]}>
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
      {sectionIds ?
        sectionIds.map(id => <SectionContainer key={id} sectionId={id} />)
        : 'loading...'}
    </span>

    <AddSection patternId={patternId} />

  </>);
};

Pattern.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    info: PropTypes.string,
    patternId: PropTypes.string.isRequired,
    sectionIds: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pattern);
