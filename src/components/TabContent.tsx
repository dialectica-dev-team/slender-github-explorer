import { Typography } from '@material-ui/core'
import React from 'react'

interface Props {
  count: number,
  label: string
}

const TabContent: React.FC<Props> = ({ label, count }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" align="center">{ count }</Typography>
      <Typography variant="caption" align="center">{ label }</Typography>
    </React.Fragment>
  )
}

export default TabContent
