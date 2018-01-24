import { createMuiTheme } from 'material-ui/styles';
import deepPurple from 'material-ui/colors/deepPurple';
import lime from 'material-ui/colors/lime';
import pink from 'material-ui/colors/pink';
import lightBlue from 'material-ui/colors/lightBlue';

const theme = createMuiTheme({
  palette: {
    primary: { main: deepPurple[400] },
    secondary: { main: lightBlue['A400'] },
    alert: pink['A400'],
    contrast: lime['A400'],
    contrastText: '#000',
  },
});

export default theme;
