import { AppBar, Toolbar, Typography, LinearProgress, Fade } from '@material-ui/core';
import React from 'react';
import RepoForm from '../components/RepoForm';
import useLayoutPortals from '../hooks/useLayoutPortals';
import { useSelector } from 'react-redux';
import { CombinedState } from '../typings';
import useStyles from './styles';
import UserInfoBar from '../components/UserInfoBar';

interface Props {
}

const Header = (props: Props) => {
  const classes = useStyles();
  const { header } = useLayoutPortals();
  const loading = useSelector<CombinedState, CombinedState[ 'app' ][ 'loading' ]>(({ app: { loading } }) => loading);

  return (
    <React.Fragment>
      <AppBar position="sticky" color="primary" variant="elevation">
        <Toolbar className={ classes.headerToolbar } color="default">
          <Typography variant="h6">
            { "Slender Github Explorer" }
          </Typography>

          <UserInfoBar />
        </Toolbar>
      </AppBar>
      <AppBar position="sticky" color="default" variant="outlined" className={ classes.mainAppBar }>
        <Toolbar>
          <div id="layout-header-secondary-toolbar" ref={ header }></div>
          <RepoForm />
        </Toolbar>
        <Fade in={ loading }>
          <LinearProgress variant={ loading ? "indeterminate" : "determinate" } value={ 0 } color="secondary" />
        </Fade>
      </AppBar>
    </React.Fragment>
  )
}

export default Header;
