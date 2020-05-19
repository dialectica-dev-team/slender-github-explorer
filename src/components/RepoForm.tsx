import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppActions } from '../actions';
import { CombinedState } from '../typings';
import RepositoryAutocomplete from './RepositoryAutocomplete';

interface Props {
}

const RepoForm = (props: Props) => {
  const { accessToken, repoPath } = useSelector<CombinedState, CombinedState[ 'app' ]>(({ app }) => app);
  const { setAccessToken } = useAppActions();
  const handleAccessTokenChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessToken(event.target.value);
  }, [ setAccessToken ]);

  return (
    <Grid id="component-repo-form" container spacing={ 1 } direction="row-reverse">
      <Grid item xs={ 6 } md={ 3 }>
        <RepositoryAutocomplete repositoryPath={ repoPath } />
      </Grid>
      <Grid item xs={ 6 } md={ 3 }>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          label="Github Access Token"
          onChange={ handleAccessTokenChange }
          value={ accessToken }
        />
      </Grid>
    </Grid>
  )
}

export default RepoForm
