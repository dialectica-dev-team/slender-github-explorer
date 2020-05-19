/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Portal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { useForksActions } from '../actions'
import { FETCH_REPO_FORKS } from '../graphql/queries'
import useRepositoryQuery from '../hooks/useRepositoryQuery'
import { CombinedState, ForkOrder, ForksResultData, RepositoryNode, RepositoryPrivacy } from '../typings'
import { translateOrderDirection } from '../utils'
import PageControls from './PageControls'
import { RepositoryExplorerContext } from './RepositoryExplorer'
import SortableTableCell from './SortableTableCell'
import FilteringDropDownMenu from './FilteringDropDownMenu'

const ForksPanel: React.FC<{}> = _ => {
  const { owner = "", name = "", toolbarControls } = React.useContext(RepositoryExplorerContext);
  const { applySort, applyRepoPrivacy } = useForksActions();
  const { direction, field, privacy, limit } = useSelector<CombinedState, CombinedState[ 'forks' ]>(({ forks }) => forks);
  const variables = React.useMemo(() => ({ owner, name, limit, privacy, order: { field, direction } }), [ owner, name, limit, privacy, field, direction ]);
  const { nodes: forks, totalCount, pageInfo, loading, loadMore, refetch } = useRepositoryQuery<ForksResultData>(FETCH_REPO_FORKS, variables);

  const handleSort = React.useCallback((_: any, field: ForkOrder[ 'field' ], direction: 'asc' | 'desc') => {
    const sort: ForkOrder = { field, direction: direction === 'asc' ? 'ASC' : 'DESC' };
    refetch({ ...variables, order: sort })
    applySort(sort);
  }, []);

  const handlePrivacyFilter = React.useCallback((privacy: (RepositoryPrivacy | 'ALL')[]) => {
    const opt = privacy?.[ 0 ] || 'ALL';
    applyRepoPrivacy(opt === 'ALL' ? null : opt);
  }, []);

  const paginate = React.useMemo(() => {
    return pageInfo && <PageControls
      disabled={ loading }
      pageInfo={ pageInfo }
      total={ totalCount }
      itemsCount={ forks.length }
      onPageChange={ loadMore }
    />
  }, [ pageInfo, loadMore, loading, totalCount ])

  return (
    <div id="component-forks-panel">
      <Portal container={ toolbarControls.current }>
        <FilteringDropDownMenu<RepositoryPrivacy>
          radio
          options={ { ALL: 'ALL', PRIVATE: 'PRIVATE', PUBLIC: 'PUBLIC' } }
          selected={ privacy || 'ALL' }
          onApplyFilter={ handlePrivacyFilter }
        >
          Privacy:
        </FilteringDropDownMenu>

        { paginate }
      </Portal>
      <TableContainer>
        <Table stickyHeader>
          <caption>
            { pageInfo && <PageControls
              disabled={ loading }
              pageInfo={ pageInfo }
              total={ totalCount }
              itemsCount={ forks.length }
              onPageChange={ loadMore }
            /> }
          </caption>
          <TableHead>
            <TableRow>
              <TableCell align="left" scope="col">Owner</TableCell>
              <TableCell>Fork</TableCell>
              <TableCell align="left" size="small">
                Description
              </TableCell>
              <SortableTableCell
                align="center"
                onRequestSort={ handleSort }
                sortProperty="STARGAZERS"
                defaultDirection={ translateOrderDirection(direction) as any }
                sortDirection={ field === 'STARGAZERS' ? translateOrderDirection(direction) : false }
              >
                Stars
              </SortableTableCell>
              <SortableTableCell
                sortProperty="CREATED_AT"
                onRequestSort={ handleSort }
                defaultDirection={ translateOrderDirection(direction) as any }
                sortDirection={ field === 'CREATED_AT' ? translateOrderDirection(direction) : false }
              >
                Created At
              </SortableTableCell>
              <TableCell>Privacy Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (forks as RepositoryNode[]).map((fork, idx) => (
              <TableRow key={ fork.id + '-' + idx }>
                <TableCell align="center">
                  { fork.owner && (
                    <Tooltip title={ fork.owner.login }>
                      <Avatar
                        alt={ fork.owner.login }
                        src={ fork.owner.avatarUrl }
                      />
                    </Tooltip>
                  ) }
                </TableCell>
                <TableCell>{ fork.nameWithOwner }</TableCell>
                <TableCell>{ fork.description }</TableCell>
                <TableCell align="center">
                  { fork.stargazers.totalCount }
                </TableCell>
                <TableCell align="left">{ fork.createdAt } </TableCell>
                <TableCell>{ fork.isPrivate ? 'PRIVATE' : 'PUBLIC' } </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </div >
  )
}

export default ForksPanel
