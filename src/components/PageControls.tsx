import { IconButton, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'; import React from 'react';
import { PageInfo } from '../typings';

interface Props {
  disabled?: boolean,
  total: number,
  itemsCount: number,
  pageInfo: PageInfo
  onPageChange: (cursor: string) => void
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttons: {

  }
}));

const PageControls: React.FC<Props> = ({ total, pageInfo, onPageChange, itemsCount, disabled = false }) => {
  const classes = useStyles();

  const createClickHandler = React.useCallback(() => (_: any) => {
    onPageChange(pageInfo.endCursor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ pageInfo ]);

  return (
    <div className={ classes.root }>
      <Typography variant="caption">{ itemsCount } - { total }</Typography>
      <div className={ classes.buttons }>
        <IconButton color="default" size="small" title="Load more" disabled={ disabled || !pageInfo.hasNextPage } onClick={ createClickHandler() } >
          <ExpandMoreIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default PageControls
