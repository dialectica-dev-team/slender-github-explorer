import { Action } from '../typings';
import { useDispatch } from 'react-redux';

export type SetAccessToken = Action<'SET_ACCESS_TOKEN', string>;
export type ClearAccessToken = Action<'CLEAR_ACCESS_TOKEN', never>;
export type SetRepoPath = Action<'SET_REPO_PATH', string>;
export type ClearRepoPath = Action<'CLEAR_REPO_PATH', never>;
export type SetForegroundTab = Action<'SET_FOREGROUND_TAB', string>;
export type SetLoading = Action<'SET_LOADING', boolean>;

export type AppActionBarrel =
  | SetAccessToken
  | ClearAccessToken
  | SetRepoPath
  | ClearRepoPath
  | SetForegroundTab
  | SetLoading;

export default () => {
  const dispatch = useDispatch();

  return {
    setAccessToken: (accessToken: string | null) => {
      if (!accessToken)
        return dispatch<ClearAccessToken>({ type: 'CLEAR_ACCESS_TOKEN' });

      return dispatch<SetAccessToken>({
        type: 'SET_ACCESS_TOKEN',
        payload: accessToken,
      });
    },
    setRepoPath: (repoPath: string | null) => {
      if (!repoPath)
        return dispatch<ClearRepoPath>({
          type: 'CLEAR_REPO_PATH',
        });

      return dispatch<SetRepoPath>({
        type: 'SET_REPO_PATH',
        payload: repoPath,
      });
    },
    setForegroundTab: (tabValue: string) =>
      dispatch<SetForegroundTab>({
        type: 'SET_FOREGROUND_TAB',
        payload: tabValue,
      }),
    setLoading: (loadingState: boolean) =>
      dispatch<SetLoading>({ type: 'SET_LOADING', payload: loadingState }),
  };
};
