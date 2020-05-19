import { combineReducers } from 'redux';
import app, { INITIAL_STATE as appInitialState } from './appReducer';
import issues, { INITIAL_STATE as issuesInitialState } from './issuesReducer';
import forks, { INITIAL_STATE as forksInitialState } from './forksReducer';
import pullRequests, {
  INITIAL_STATE as pullsInitialState,
} from './pullRequestsReducer';
import popper, { INITIAL_STATE as popperInitialState } from './popperReducer';

export const initialState = {
  app: appInitialState,
  issues: issuesInitialState,
  forks: forksInitialState,
  pullRequests: pullsInitialState,
  popper: popperInitialState,
};

export default combineReducers({
  app,
  issues,
  forks,
  pullRequests,
  popper,
});
