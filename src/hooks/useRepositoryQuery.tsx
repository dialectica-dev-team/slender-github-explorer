import useProgressIndicator from './useProgressIndicator';
import { useQuery, DocumentNode } from '@apollo/client';
import React from 'react';
import { ForksResultData, IssuesResultData, PullRequestsResultData, RepositoryResultData, IssuesQueryVariables, ForksQueryVariables, PullRequestsQueryVariables } from '../typings';
import defaultsDeep from 'lodash/defaultsDeep';


type ResultDataUnion = IssuesResultData | ForksResultData | PullRequestsResultData;
type Variables<T extends ResultDataUnion> = T extends IssuesResultData
  ? IssuesQueryVariables
  : (T extends ForksResultData
    ? ForksQueryVariables
    : PullRequestsQueryVariables);

export default <T extends ResultDataUnion>(query: DocumentNode, variables: Variables<T>) => {
  const [ _loading, setLoading ] = React.useState<boolean>(false);
  const { data, error, loading, fetchMore, ...queryData } = useQuery<RepositoryResultData<T>, typeof variables>(query, { variables });

  const isLoading = React.useMemo(() => loading || _loading, [ loading, _loading ]);
  useProgressIndicator(isLoading);

  const nodes = React.useMemo(
    () => data?.repository.data.nodes || [],
    [ data ]
  );
  const totalCount = React.useMemo(
    () => data?.repository.data.totalCount || 0,
    [ data ]
  );
  const pageInfo = React.useMemo(
    () => data?.repository.data.pageInfo,
    [ data ]
  );

  const loadMore = (cursor: string) => {
    setLoading(true)
    fetchMore?.({
      variables: {
        after: cursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return defaultsDeep({}, prev, {
          repository: {
            id: fetchMoreResult.repository.id,
            data: {
              totalCount: prev.repository.data.totalCount,
              pageInfo: fetchMoreResult.repository.data.pageInfo,
              nodes: [ ...prev.repository.data.nodes, ...fetchMoreResult.repository.data.nodes ]
            }
          }
        });
      }
    }).finally(() => setLoading(false));
  }

  return {
    loading,
    loadMore,
    nodes,
    pageInfo,
    totalCount,
    ...queryData
  }
}