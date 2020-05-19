import { makeStyles } from '@material-ui/core';

const useMainStyles = makeStyles(theme => ({
  root: {
    width: '100vw'
  },
  main: {
    backgroundColor: theme.palette.background.default
  },
  headerToolbar: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItem: 'center'
  },
  mainAppBar: {
    zIndex: theme.zIndex.appBar + 1,
    '&> .MuiToolbar-root': {
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1)
    }
  }
}));

export default useMainStyles;