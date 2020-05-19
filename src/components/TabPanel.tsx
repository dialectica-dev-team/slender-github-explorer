import React from 'react'
import { RepoExplorerTabValue } from '../typings'
import { Box } from '@material-ui/core';

interface Props {
  value: RepoExplorerTabValue
  index: RepoExplorerTabValue
}

const TabPanel: React.FC<Props> = ({ value, index, children }) => {
  const hidden = React.useMemo<boolean>(() => index !== value, [ index, value ]);
  const tabId = React.useMemo<string>(() => `${index}-panel`, [ index ]);

  return (
    <div
      role="tabpanel"
      id={ tabId }
      hidden={ hidden }
    >
      { !hidden && (
        <Box p={ 3 }>
          { children }
        </Box>
      ) }
    </div>
  )
}

export default TabPanel
