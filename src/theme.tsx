import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { rgbToHex, colors } from '@material-ui/core';

const primary = 'rgb(57, 130, 217)';

export default createMuiTheme({
  palette: {
    primary: {
      main: primary
    }
  },
  overrides: {
    MuiTab: {
      wrapped: {
        borderBlockEnd: "red"
      }
    }
  }
});