import React from 'react';
import { useSelector } from 'react-redux';
import { CombinedState } from '../typings';
import RepositoryAutocomplete from './RepositoryAutocomplete';
import { Box } from '@material-ui/core';

interface Props {
}

const RepoForm = (props: Props) => {
  const { repoPath, accessToken } = useSelector<CombinedState, CombinedState[ 'app' ]>(({ app }) => app);

  return (
    <Box width={ 300 }>
      { accessToken && <RepositoryAutocomplete repositoryPath={ repoPath } /> }
    </Box>
  )
}

export default RepoForm
