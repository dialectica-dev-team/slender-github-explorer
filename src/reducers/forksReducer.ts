import { ForksActions } from '../actions';
import { ForkOrder, RepositoryPrivacy } from './../typings';

export type State = {
  limit: number;
  direction: ForkOrder['direction'];
  field: ForkOrder['field'];
  privacy: RepositoryPrivacy | null;
};

export const INITIAL_STATE: State = {
  limit: 20,
  direction: 'DESC',
  field: 'STARGAZERS',
  privacy: 'PUBLIC',
};

export default (
  state: State = INITIAL_STATE,
  { type, payload }: ForksActions
) => {
  switch (type) {
    case 'APPLY_REPO_PRIVACY':
      return { ...state, privacy: payload };
    case 'APPLY_REPO_SORT':
      return { ...state, ...(payload as ForkOrder) };
    default:
      return state;
  }
};
