/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery } from '@apollo/client'
import { AppBar, Box, makeStyles, Tab, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link as RouteLink, Route, Switch, useLocation } from 'react-router-dom'
import { FETCH_REPO_STATS } from '../graphql/queries'
import useProgressIndicator from '../hooks/useProgressIndicator'
import { CombinedState } from '../typings'
import ForksPanel from './ForksPanel'
import IssuesPanel from './IssuesPanel'
import PullRequestsPanel from './PullRequestsPanel'
import TabContent from './TabContent'
import TabsNav from './TabsNav'

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 1)
  },
  toolbarControls: {
    justifyContent: 'space-evenly',
    display: 'flex',
    alignItems: 'flex-end',
    flexFlow: 'column'
  }
}));

const toolbarTitle = React.createRef<HTMLSpanElement>();
const toolbarControls = React.createRef<HTMLDivElement>();

type RepositoryExplorerContextType = {
  toolbarTitle: typeof toolbarTitle,
  toolbarControls: typeof toolbarControls,
  name?: string,
  owner?: string
};
const defaultContextValues = { toolbarTitle, toolbarControls };
export const RepositoryExplorerContext = React.createContext<RepositoryExplorerContextType>(defaultContextValues);

const RepositoryExplorer: React.FC<{}> = () => {
  const classes = useStyles();
  const { repoPath, accessToken } = useSelector<CombinedState, CombinedState[ 'app' ]>(({ app }) => app);
  const location = useLocation();
  const [ stats, setStats ] = React.useState<{ issues: number, forks: number, pullRequests: number } | undefined>();

  const selectedTab = React.useMemo(() => location.pathname, [ location ]);
  const hasStats = React.useMemo<boolean>(() => stats !== undefined, [ stats ]);
  const { owner, name } = React.useMemo<{ owner?: string, name?: string }>(() => {
    if (!repoPath)
      return {};
    const matches = repoPath.split('/', 2);
    return {
      owner: matches?.[ 0 ],
      name: matches?.[ 1 ]
    }
  }, [ repoPath ]);
  const shouldShow = React.useMemo<boolean>(() => hasStats && name && owner && accessToken ? true : false, [ hasStats, name, owner, accessToken ]);

  const contextValues = React.useMemo(() => ({
    ...defaultContextValues,
    owner,
    name
  }), [ owner, name ]);

  const [ fetchRepoStats, { data, loading, called } ] = useLazyQuery(FETCH_REPO_STATS, {
    variables: {
      owner,
      name
    }
  });
  useProgressIndicator(loading);

  React.useEffect(() => {
    if (!owner || !name) {
      setStats(undefined);
      return;
    }
    fetchRepoStats({
      variables: {
        owner,
        name
      }
    })
  }, [ owner, name, called ]);

  React.useEffect(() => {
    if (!data)
      return;

    setStats({
      issues: data.repository.issues.totalCount,
      forks: data.repository.forks.totalCount,
      pullRequests: data.repository.pullRequests.totalCount
    });
  }, [ data ]);

  return (
    <div id="component-repository-explorer">
      <TabsNav
        disabled={ shouldShow }
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        value={ selectedTab }
      >
        <Tab component={ RouteLink } value="/issues" to={ { pathname: '/issues', state: { owner, name } } } label={ <TabContent label="Issues" count={ stats?.issues || 0 } /> } />
        <Tab component={ RouteLink } value="/forks" to={ { pathname: '/forks', state: { owner, name } } } label={ <TabContent label="Forks" count={ stats?.forks || 0 } /> } />
        <Tab component={ RouteLink } value="/pull-requests" to={ { pathname: '/pull-requests', state: { owner, name } } } label={ <TabContent label="Pull Requests" count={ stats?.pullRequests || 0 } /> } />
      </TabsNav>

      { shouldShow &&
        <AppBar color="transparent" position="relative" variant="outlined">
          <Toolbar className={ classes.toolbar }>
            <div>
              <Typography display="block" variant="h6">
                { owner } { "/" } { name }
              </Typography>
              <Typography display="block" variant="caption" color="textSecondary">
                { data?.repository.description }
              </Typography>
            </div>
            <div className={ classes.toolbarControls } ref={ toolbarControls }></div>
          </Toolbar>
        </AppBar>
      }

      { shouldShow && <RepositoryExplorerContext.Provider value={ contextValues }>
        <Switch>
          <Route path="/issues" component={ IssuesPanel } />
          <Route path="/forks" component={ ForksPanel } />
          <Route path="/pull-requests" component={ PullRequestsPanel } />
        </Switch>
      </RepositoryExplorerContext.Provider> }

      { !shouldShow &&
        <Box p={ 4 } m="auto" >
          <Typography variant="h5" color="textSecondary" align="center">
            No results or no repository selected.
          </Typography>
        </Box>
      }

    </div >
  )
}

export default RepositoryExplorer
