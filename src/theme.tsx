import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { colors } from '@material-ui/core';


export default createMuiTheme({
  palette: {
    text: {
      primary: colors.grey[ 900 ],
      secondary: colors.grey[ 600 ],
      disabled: colors.blueGrey[ 200 ]
    },
    background: {
      default: colors.grey[ 100 ],
      paper: colors.common.white
    },
    primary: {
      main: colors.blue[ 600 ],
      dark: colors.blue[ 900 ],
      light: colors.blue[ 200 ]
    },
    secondary: {
      main: colors.pink[ 500 ],
      dark: colors.pink[ 800 ],
      light: colors.pink[ 300 ]
    }
  }
});