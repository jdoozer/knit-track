import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import lime from '@material-ui/core/colors/lime';

const theme = createMuiTheme({
  palette: {
    primary: {
      ...teal,
      bg: teal['A200'],
    },
    secondary: lime,
  },
});

export default theme;
