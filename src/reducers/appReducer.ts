import { AppActionBarrel } from '../actions';
import { RepoExplorerTabValue } from '../typings';

export type State = {
  accessToken: string;
  loading: boolean;
  repoPath: string;
  selectedTab: RepoExplorerTabValue;
};

export const INITIAL_STATE: State = {
  accessToken: '',
  loading: false,
  repoPath: '',
  selectedTab: 'tab-issues',
};

export default (
  state: State = INITIAL_STATE,
  { type, payload }: AppActionBarrel
) => {
  switch (type) {
    case 'SET_ACCESS_TOKEN':
      return { ...state, accessToken: payload };
    case 'CLEAR_ACCESS_TOKEN':
      return { ...state, accessToken: '' };
    case 'SET_REPO_PATH':
      return { ...state, repoPath: payload };
    case 'CLEAR_REPO_PATH':
      return { ...state, repoPath: '' };
    case 'SET_FOREGROUND_TAB':
      return { ...state, selectedTab: payload };
    case 'SET_LOADING':
      return { ...state, loading: payload };
    default:
      return state;
  }
};
