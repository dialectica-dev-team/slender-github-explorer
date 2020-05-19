import { useDispatch } from 'react-redux';
import { Action, IssueOrder, PullRequestState } from '../typings';

export type ApplyPullRequestsState = Action<'APPLY_PULL_STATE', PullRequestState[]>;
export type ApplyPullRequestsSort = Action<'APPLY_PULL_SORT', IssueOrder>;

export type PullRequestsActions = ApplyPullRequestsState | ApplyPullRequestsSort;

export default () => {
  const dispatch = useDispatch();

  return {
    applyIssueState: (state: PullRequestState[]) =>
      dispatch<ApplyPullRequestsState>({ type: 'APPLY_PULL_STATE', payload: state }),
    applySort: (sort: IssueOrder) =>
      dispatch<ApplyPullRequestsSort>({ type: 'APPLY_PULL_SORT', payload: sort }),
  };
};
