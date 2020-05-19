import { PullRequestsActions } from './../actions/pullRequests';
import { PullRequestState } from '../typings';
import { IssueOrder } from '../typings';

export type State = {
  limit: number;
  direction: IssueOrder['direction'];
  field: IssueOrder['field'];
  pullStates: PullRequestState[];
};

export const INITIAL_STATE: State = {
  limit: 20,
  direction: 'DESC',
  field: 'COMMENTS',
  pullStates: ['OPEN'],
};

export default (
  state: State = INITIAL_STATE,
  { type, payload }: PullRequestsActions
) => {
  switch (type) {
    case 'APPLY_PULL_STATE':
      return { ...state, pullStates: [...(payload as PullRequestState[])] };
    case 'APPLY_PULL_SORT':
      return { ...state, ...(payload as IssueOrder) };
    default:
      return state;
  }
};
