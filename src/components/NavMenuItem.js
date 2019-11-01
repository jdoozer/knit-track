import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: props => theme.spacing(3 * (props.level + 1)),
  },
  selected: {
    '& div': {
      '& span': {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
      }
    },
  }
}));

const NavMenuItem = (props) => {

  const { link, level, children } = props;
  const classes = useStyles(props);
  const levelVariants = ['h6', 'body1', 'body2'];
  const variant = (level < levelVariants.length)
    ? levelVariants[level]
    : levelVariants.pop();

  let itemProps = { className: classes.root };

  if (link) {
    itemProps.component = React.forwardRef((props, ref) => (
      <NavLink
        innerRef={ref}
        to={link}
        activeClassName={classes.selected}
        {...props}
      />
    ));
    itemProps.button = true;
  } else {
    itemProps.component = 'div';
  }

  return (
    <ListItem {...itemProps}>
      <ListItemText primary={children} primaryTypographyProps={{ variant }} />
    </ListItem>
  );

};

export default NavMenuItem;
