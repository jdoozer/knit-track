import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757de8',
      main: '#3f51b5',
      dark: '#002984',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fdff58',
      main: '#c6ff00', // lime['A400']
      dark: '#90cc00',
      contrastText: '#000',
    },
    alert: '#f50057',
    contentHeader: '#4fc3f7',
  },
});

export default theme;
