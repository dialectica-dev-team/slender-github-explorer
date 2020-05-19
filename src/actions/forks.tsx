import { useDispatch } from 'react-redux';
import { Action, ForkOrder, RepositoryPrivacy } from '../typings';

export type ApplyRepoPrivacy = Action<'APPLY_REPO_PRIVACY', RepositoryPrivacy | null>;
export type ApplyForksSort = Action<'APPLY_REPO_SORT', ForkOrder>;

export type ForksActions = ApplyRepoPrivacy | ApplyForksSort;

export default () => {
  const dispatch = useDispatch();

  return {
    applyRepoPrivacy: (state: ApplyRepoPrivacy[ 'payload' ]) =>
      dispatch<ApplyRepoPrivacy>({ type: 'APPLY_REPO_PRIVACY', payload: state || null }),
    applySort: (sort: ForkOrder) =>
      dispatch<ApplyForksSort>({ type: 'APPLY_REPO_SORT', payload: sort }),
  };
};

