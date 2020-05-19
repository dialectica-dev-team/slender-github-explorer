import { gql } from '@apollo/client';

export const FIND_REPOS = gql`
  query SearchRepository($query: String!, $limit: Int = 5) {
    search(type: REPOSITORY, first: $limit, query: $query) {
      edges {
        node {
          ... on Repository {
            id
            name
            nameWithOwner
          }
        }
      }
    }
  }
`;

export const FETCH_REPO_STATS = gql`
  query Repository($owner: String!, $name: String!) {
    repository(name: $name, owner: $owner) {
      id
      description
      forks {
        totalCount
      }
      issues {
        totalCount
      }
      pullRequests {
        totalCount
      }
      languages {
        totalCount
      }
    }
  }
`;

export const FETCH_REPO_ISSUES = gql`
  query RepositoryIssues(
    $owner: String!
    $name: String!
    $states: [IssueState!]
    $order: IssueOrder
    $limit: Int = 20
    $after: String
    $before: String
  ) {
    repository(owner: $owner, name: $name) {
      id
      data: issues(
        first: $limit
        after: $after
        before: $before
        orderBy: $order
        filterBy: { states: $states }
      ) {
        pageInfo {
          endCursor
          hasNextPage
          startCursor
          hasPreviousPage
        }
        totalCount
        nodes {
          id
          number
          title
          author {
            login
            avatarUrl(size: 32)
            url
          }
          comments {
            totalCount
          }
          createdAt
          state
        }
      }
    }
  }
`;

export const FETCH_REPO_FORKS = gql`
  query RepositoryForks(
    $owner: String!
    $name: String!
    $privacy: RepositoryPrivacy
    $order: RepositoryOrder
    $limit: Int = 20
    $after: String
  ) {
    repository(owner: $owner, name: $name) {
      id
      data: forks(
        first: $limit
        after: $after
        orderBy: $order
        privacy: $privacy
      ) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
        nodes {
          id
          owner {
            id
            login
            avatarUrl(size: 32)
            url
          }
          description
          isPrivate
          nameWithOwner
          createdAt
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

export const FETCH_REPO_PULL_REQUESTS = gql`
  query RepositoryPullRequests(
    $owner: String!
    $name: String!
    $states: [PullRequestState!]
    $order: IssueOrder
    $limit: Int = 20
    $after: String
  ) {
    repository(owner: $owner, name: $name) {
      id
      data: pullRequests(
        first: $limit
        after: $after
        orderBy: $order
        states: $states
      ) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
        nodes {
          id
          title
          author {
            login
            avatarUrl
            url
          }
          comments {
            totalCount
          }
          state
          createdAt
        }
      }
    }
  }
`;
