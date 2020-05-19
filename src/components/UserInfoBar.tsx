import React from 'react'
import { Box, makeStyles, fade, InputBase, Avatar, Typography, CircularProgress } from '@material-ui/core'
import KeyIcon from '@material-ui/icons/VpnKey';
import { useSelector } from 'react-redux';
import { useAppActions } from '../actions';
import { CombinedState } from '../typings';
import { useQuery } from '@apollo/client';
import { FETCH_VIEWER_DATA } from '../graphql/queries';

const useStyles = makeStyles(theme => ({
  userInfo: {
    display: 'inline-flex'
  },
  accessToken: {
    flexGrow: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [ theme.breakpoints.up('sm') ]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  keyIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [ theme.breakpoints.up('sm') ]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const UserInfoBar = () => {
  const classes = useStyles();
  const { accessToken } = useSelector<CombinedState, CombinedState[ 'app' ]>(({ app }) => app);
  const { setAccessToken } = useAppActions();
  const handleAccessTokenChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessToken(event.target.value);
  }, [ setAccessToken ]);

  const { data, refetch, loading } = useQuery(FETCH_VIEWER_DATA);

  React.useEffect(() => {
    refetch();
  }, [ accessToken ]);

  return (
    <Box p={ 2 } display="flex" alignItems="center" justifyContent="flex-end" flexDirection="row-reverse">
      <div className={ classes.userInfo }>
        <Box paddingX={ 3 }>
          <Typography variant="subtitle1" align="right">
            { data?.viewer.login }
          </Typography>
          <Typography variant="caption" align="right" noWrap>
            { data?.viewer.name }
          </Typography>
        </Box>
        <Avatar alt={ data?.viewer.name } src={ data?.viewer.avatarUrl }>
          { loading && <CircularProgress /> }
          { !loading && !data && "?" }
        </Avatar>
      </div>
      <div className={ classes.accessToken }>
        <div className={ classes.keyIcon }>
          <KeyIcon />
        </div>
        <InputBase
          placeholder="Access token…"
          value={ accessToken }
          onChange={ handleAccessTokenChange }
          classes={ {
            root: classes.inputRoot,
            input: classes.inputInput,
          } }
          inputProps={ { 'aria-label': 'search' } }
        />
      </div>
    </Box >
  )
}

export default UserInfoBar
