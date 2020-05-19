import { useLazyQuery } from '@apollo/client';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useAppActions } from '../actions';
import { FIND_REPOS } from '../graphql/queries';

interface Props {
  repositoryPath?: string
}

const RepositoryAutocomplete: React.FC<Props> = ({ repositoryPath }) => {
  const { setRepoPath } = useAppActions();

  const [ searchRepos, { data: queryResults, loading } ] = useLazyQuery(FIND_REPOS, {
    variables: {
      query: ""
    }
  });

  const repos = React.useMemo<string[]>(() => {
    if (!queryResults)
      return [];

    return queryResults.search.edges.map((o: any) => o.node.nameWithOwner);
  }, [ queryResults ]);

  const handleChange = React.useCallback((_, repo: string | null) => {
    setRepoPath(repo);
  }, [ setRepoPath ]);

  const handleInputChange = React.useCallback((event: object, query: string, reason: string) => {
    searchRepos({ variables: { query } });
  }, [ searchRepos ]);

  return (
    <Autocomplete
      fullWidth
      autoComplete
      freeSolo
      options={ repos }
      loading={ loading }
      value={ repositoryPath }
      onInputChange={ handleInputChange }
      onChange={ handleChange }
      renderInput={ (props) => <TextField { ...props } size="small" label="Select Repository" variant="outlined" /> }
    />

  )
}


export default RepositoryAutocomplete
