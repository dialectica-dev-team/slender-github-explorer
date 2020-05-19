/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Portal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useIssuesActions } from '../actions';
import { FETCH_REPO_ISSUES } from '../graphql/queries';
import useRepositoryQuery from '../hooks/useRepositoryQuery';
import { CombinedState, IssueNode, IssueOrder, IssuesQueryVariables, IssuesResultData, IssueState } from '../typings';
import FilteringDropDownMenu from './FilteringDropDownMenu';
import PageControls from './PageControls';
import { RepositoryExplorerContext } from './RepositoryExplorer';
import SortableTableCell from './SortableTableCell';

type Props = {
  name: string;
  owner: string;
};

const IssuesPanel: React.FC<Props> = () => {
  // const classes = useStyles();
  const { name = '', owner = '', toolbarControls } = React.useContext(
    RepositoryExplorerContext
  );
  const { applySort, applyIssueState } = useIssuesActions();
  const { issueStates, sort, limit } = useSelector<
    CombinedState,
    CombinedState[ 'issues' ]
  >(({ issues }) => ({ ...issues }));

  const variables = React.useMemo<IssuesQueryVariables>(() => ({
    name,
    owner,
    limit,
    states: [ ...issueStates ] as any,
    order: { ...sort },
  }), []);

  const { nodes: issues, totalCount, pageInfo, loading, loadMore, refetch } = useRepositoryQuery<IssuesResultData>(FETCH_REPO_ISSUES, variables);

  const handleSort = React.useCallback((_: any, field: IssueOrder[ 'field' ], direction: 'asc' | 'desc') => {
    const order: IssueOrder = { field, direction: direction === 'asc' ? 'ASC' : 'DESC' };
    refetch({
      ...variables,
      order
    });
    applySort(order);
  }, []);

  const handleIssusStatesFilter = React.useCallback((issueStates: IssueState[]) => {
    refetch({
      ...variables,
      states: issueStates
    });
    applyIssueState(issueStates);
  }, []);

  const paginate = React.useMemo(() => (
    pageInfo && <PageControls
      disabled={ loading }
      pageInfo={ pageInfo }
      total={ totalCount }
      itemsCount={ issues.length }
      onPageChange={ loadMore }
    />
  ), [ pageInfo, totalCount, loading, loadMore ]);

  return (
    <div id="component-issues-panel">
      <Portal container={ toolbarControls.current }>
        <FilteringDropDownMenu<IssueState>
          options={ { OPEN: 'OPEN', CLOSED: 'CLOSED' } }
          selected={ issueStates }
          onApplyFilter={ handleIssusStatesFilter }
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
              <TableCell scope="col"># Issue</TableCell>
              <TableCell align="left" size="small">
                Title
              </TableCell>
              <TableCell align="center">Author</TableCell>
              <SortableTableCell
                align="center"
                onRequestSort={ handleSort }
                sortProperty="COMMENTS"
                sortDirection={
                  sort.field === 'COMMENTS'
                    ? (sort.direction.toLocaleLowerCase() as any)
                    : false
                }
              >
                Comments
              </SortableTableCell>
              <SortableTableCell
                sortProperty="CREATED_AT"
                onRequestSort={ handleSort }
                sortDirection={
                  sort.field === 'CREATED_AT'
                    ? (sort.direction.toLocaleLowerCase() as any)
                    : false
                }
              >
                Created At
              </SortableTableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (issues as IssueNode[]).map((issue, idx) => (
              <TableRow key={ issue.id + '-' + idx }>
                <TableCell>{ issue.number }</TableCell>
                <TableCell>{ issue.title }</TableCell>
                <TableCell align="center">
                  { issue.author && (
                    <Tooltip title={ issue.author.login }>
                      <Avatar
                        alt={ issue.author.login }
                        src={ issue.author.avatarUrl }
                      />
                    </Tooltip>
                  ) }
                </TableCell>
                <TableCell align="center">
                  { issue.comments.totalCount }
                </TableCell>
                <TableCell align="left">{ issue.createdAt } </TableCell>
                <TableCell>{ issue.state } </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IssuesPanel;
