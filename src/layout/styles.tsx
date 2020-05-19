import { makeStyles } from '@material-ui/core';

const useMainStyles = makeStyles(theme => ({
  root: {
    width: '100vw'
  },
  main: {
    backgroundColor: theme.palette.background.default
  },
  mainAppBar: {
    zIndex: theme.zIndex.appBar + 1,
    '&> .MuiToolbar': {
      marginBottom: theme.spacing(1)
    }
  }
}));

export default useMainStyles;