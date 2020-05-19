/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Portal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core'
import React from 'react'
import { FETCH_REPO_PULL_REQUESTS } from '../graphql/queries'
import useRepositoryQuery from '../hooks/useRepositoryQuery'
import { IssueOrder, PullRequestNode, PullRequestsResultData, CombinedState, PullRequestState } from '../typings'
import PageControls from './PageControls'
import { RepositoryExplorerContext } from './RepositoryExplorer'
import SortableTableCell from './SortableTableCell'
import { usePullRequestsActions } from '../actions'
import { translateOrderDirection } from '../utils'
import { useSelector } from 'react-redux'
import FilteringDropDownMenu from './FilteringDropDownMenu'

interface Props { }

const PullRequestsPanel: React.FC<Props> = () => {
  const { owner = "", name = "", toolbarControls } = React.useContext(RepositoryExplorerContext);
  const { applySort, applyIssueState } = usePullRequestsActions();
  const { direction, field, pullStates, limit, } = useSelector<CombinedState, CombinedState[ 'pullRequests' ]>(({ pullRequests }) => pullRequests);
  const variables = { owner, name, limit: limit, states: pullStates, order: { field, direction } as IssueOrder }
  const { nodes: pullRequests, totalCount, pageInfo, loading, loadMore, refetch } = useRepositoryQuery<PullRequestsResultData>(FETCH_REPO_PULL_REQUESTS, variables);


  const handleSort = React.useCallback((_: any, field: IssueOrder[ 'field' ], direction: 'asc' | 'desc') => {
    const sort: IssueOrder = { field, direction: direction === 'asc' ? 'ASC' : 'DESC' };
    refetch({ ...variables, order: sort })
    applySort(sort);
  }, []);

  const handlePullReqStatesFilter = React.useCallback((states: PullRequestState[]) => {
    refetch({
      ...variables,
      states
    });
    applyIssueState(states);
  }, []);

  const paginate = React.useMemo(() => {
    return pageInfo && <PageControls
      disabled={ loading }
      pageInfo={ pageInfo }
      total={ totalCount }
      itemsCount={ pullRequests.length }
      onPageChange={ loadMore }
    />
  }, [ pageInfo, loadMore, loading, totalCount ])

  return (
    <div id="component-forks-panel">
      <Portal container={ toolbarControls.current }>
        <FilteringDropDownMenu<PullRequestState>
          options={ { OPEN: 'OPEN', CLOSED: 'CLOSED', MERGED: 'MERGED' } }
          selected={ pullStates }
          onApplyFilter={ handlePullReqStatesFilter }
        >
          State:
        </FilteringDropDownMenu>

        { paginate }
      </Portal>
      <TableContainer>
        <Table stickyHeader>
          <caption>
            { paginate }
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left" scope="col">Author</TableCell>
              <SortableTableCell
                align="center"
                onRequestSort={ handleSort }
                sortProperty="COMMENTS"
                sortDirection={ field === 'COMMENTS' ? translateOrderDirection(direction) : false }
              >
                Comments
              </SortableTableCell>
              <SortableTableCell
                sortProperty="CREATED_AT"
                onRequestSort={ handleSort }
                sortDirection={ field === 'CREATED_AT' ? translateOrderDirection(direction) : false }
              >
                Created At
              </SortableTableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (pullRequests as PullRequestNode[]).map((pr, idx) => (
              <TableRow key={ pr.id + '-' + idx }>
                <TableCell>{ pr.title }</TableCell>
                <TableCell align="center">
                  { pr.author && (
                    <Tooltip title={ pr.author.login }>
                      <Avatar
                        alt={ pr.author.login }
                        src={ pr.author.avatarUrl }
                      />
                    </Tooltip>
                  ) }
                </TableCell>
                <TableCell align="center">
                  { pr.comments.totalCount }
                </TableCell>
                <TableCell align="left">{ pr.createdAt } </TableCell>
                <TableCell>{ pr.state } </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </div >
  )
}

export default PullRequestsPanel
