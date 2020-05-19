import { IssueOrder } from '../typings';
import { Action, IssueState } from '../typings';
import { useDispatch } from 'react-redux';

export type ApplyIssueState = Action<'APPLY_ISSUES_STATE', IssueState[]>;
export type ApplyIssuesSort = Action<'APPLY_ISSUES_SORT', IssueOrder>;

export type IssueActions = ApplyIssueState | ApplyIssuesSort;

export default () => {
  const dispatch = useDispatch();

  return {
    applyIssueState: (state: IssueState[]) =>
      dispatch<ApplyIssueState>({ type: 'APPLY_ISSUES_STATE', payload: state }),
    applySort: (sort: IssueOrder) =>
      dispatch<ApplyIssuesSort>({ type: 'APPLY_ISSUES_SORT', payload: sort }),
  };
};
