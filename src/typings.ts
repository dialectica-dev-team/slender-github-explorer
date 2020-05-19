import { Action as ReduxAction } from 'redux';
import { State as AppState } from './reducers/appReducer';
import { State as IssuesState } from './reducers/issuesReducer';
import { State as ForksState } from './reducers/forksReducer';
import { State as PullRequestsState } from './reducers/pullRequestsReducer';
import { State as PopperState } from './reducers/popperReducer';

export type Action<A extends string, P = any> = ReduxAction<A> & {
  payload?: P;
};

export type CombinedState = {
  app: AppState;
  issues: IssuesState;
  pullRequests: PullRequestsState;
  forks: ForksState;
  popper: PopperState;
};

export type BaseNodeProps = {
  id: string;
  createdAt: Date;
};

export type OrderBy<F extends string, D extends string = 'ASC' | 'DESC'> = {
  direction: D;
  field: F;
};

export type TotalCount = {
  totalCount: number;
};

export type PageInfo = {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type RepositoryConnection<T extends BaseNodeProps> = TotalCount & {
  pageInfo: PageInfo;
  nodes: T[];
};

export type RepositoryResultData<T> = {
  repository: T;
};

export type RepoExplorerTabValue =
  | 'tab-issues'
  | 'tab-pull-requests'
  | 'tab-forks'
  | 'tab-languages';

export type GithubUser = {
  id: string;
  login: string;
  avatarUrl: string;
  url: string;
};

export type IssueState = 'OPEN' | 'CLOSED';

export type IssueNode = {
  id: string;
  number: number;
  title: string;
  author: GithubUser | null;
  comments: {
    totalCount: number;
  };
  createdAt: Date;
  state: IssueState;
};

export type IssuesResultData = {
  id: string;
  data: RepositoryConnection<IssueNode>;
};

export type IssueOrder = OrderBy<'COMMENTS' | 'CREATED_AT'>;

export type BaseQueryVariables = {
  limit?: number;
  after?: string;
  before?: string;
  name: string;
  owner: string;
};

export type IssuesQueryVariables = BaseQueryVariables & {
  states: IssueState[];
  order: IssueOrder;
};

export type RepositoryPrivacy = 'PUBLIC' | 'PRIVATE';

export type RepositoryNode = BaseNodeProps & {
  owner: GithubUser;
  description: string;
  name: string;
  nameWithOwner: string;
  stargazers: TotalCount;
  isPrivate: boolean;
};

export type ForksResultData = {
  id: string;
  data: RepositoryConnection<RepositoryNode>;
};

export type ForkOrder = OrderBy<'STARGAZERS' | 'CREATED_AT'>;

export type ForksQueryVariables = BaseQueryVariables & {
  privacy: RepositoryPrivacy | null;
  order: ForkOrder;
};

export type PullRequestState = 'OPEN' | 'CLOSED' | 'MERGED';

export type PullRequestNode = BaseNodeProps & {
  title: string;
  author: GithubUser;
  comments: TotalCount;
  state: PullRequestState;
};

export type PullRequestsResultData = BaseNodeProps & {
  id: string;
  data: RepositoryConnection<PullRequestNode>;
};

export type PullRequestsQueryVariables = BaseQueryVariables & {
  order: IssueOrder;
  states: PullRequestState[];
};
