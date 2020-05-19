import { IssueActions } from '../actions';
import { IssueOrder, IssueState } from '../typings';
import { isArray } from 'util';

export type State = {
  limit: number;
  sort: IssueOrder;
  issueStates: IssueState[];
};

export const INITIAL_STATE: State = {
  limit: 20,
  sort: {
    direction: 'DESC',
    field: 'COMMENTS',
  },
  issueStates: ['OPEN'],
};

export default (
  state: State = INITIAL_STATE,
  { type, payload }: IssueActions
) => {
  switch (type) {
    case 'APPLY_ISSUES_STATE':
      return { ...state, issueStates: isArray(payload) ? [...payload] : null };
    case 'APPLY_ISSUES_SORT':
      return { ...state, sort: { ...state.sort, ...(payload as IssueOrder) } };
    default:
      return state;
  }
};
