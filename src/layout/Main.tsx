import { CssBaseline } from "@material-ui/core";
import React from 'react';

import RepositoryExplorer from '../components/RepositoryExplorer';
import Header from './Header';
import useStyles from './styles';

interface Props {

}

const Main = (props: Props) => {
  const classes = useStyles();

  return (
    <div id="app-layout-main" role="main" className={ classes.root }>
      <CssBaseline />
      <Header />
      <main className={ classes.main }>
        <RepositoryExplorer />
      </main>
    </div>
  )
}

export default Main
