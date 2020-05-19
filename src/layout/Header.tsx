import { AppBar, Toolbar, Typography, LinearProgress, Fade } from '@material-ui/core';
import React from 'react';
import RepoForm from '../components/RepoForm';
import useLayoutPortals from '../hooks/useLayoutPortals';
import { useSelector } from 'react-redux';
import { CombinedState } from '../typings';

interface Props {

}

const Header = (props: Props) => {
  const { header } = useLayoutPortals();
  const loading = useSelector<CombinedState, CombinedState[ 'app' ][ 'loading' ]>(({ app: { loading } }) => loading);

  return (
    <div className={ "root" }>
      <AppBar position="static" color="primary" variant="elevation">
        <Toolbar>
          <Typography variant="h6">
            { "Slender Github Explorer" }
          </Typography>
        </Toolbar>
      </AppBar>
      <Fade in={ loading }>
        <LinearProgress variant={ loading ? "indeterminate" : "determinate" } value={ 0 } color="secondary" />
      </Fade>
      <AppBar position="static" color="default" variant="outlined">
        <Toolbar>
          <div id="layout-header-secondary-toolbar" ref={ header }></div>
          <RepoForm />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;
