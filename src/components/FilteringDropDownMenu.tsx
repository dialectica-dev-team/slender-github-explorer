import { makeStyles, Paper, Popper, Grid, Button, ClickAwayListener } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React from 'react';
import { useSelector } from 'react-redux';
import { usePopperActions } from '../actions';
import { CombinedState } from '../typings';
import DropDownPopperContent from './DropDownPopperContent';
import { isArray } from 'util';

const useStyles = makeStyles(theme => ({
  popper: {
    zIndex: theme.zIndex.appBar + 1
  },
  paper: {
    padding: theme.spacing(3),
  },
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxWidth: 290,
    width: 220,
    backgroundColor: theme.palette.grey[ 200 ],
    marginBottom: theme.spacing(1)
  }
}));

type Props<T extends string> = {
  radio: boolean;
  selected?: T[];
  options: Record<T, string | null>;
  onApplyFilter: any;
}

const FilteringDropDownMenu = <T extends string>({ children, selected, onApplyFilter, ...props }: React.ComponentProps<any> & Props<T>) => {
  const classes = useStyles();
  const { setOpen } = usePopperActions();
  const { open, anchorEl } = useSelector<CombinedState, CombinedState[ 'popper' ]>(({ popper }) => popper);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpen(!open, event.currentTarget);
  }, [ open, setOpen ]);

  return (
    <React.Fragment>
      <Grid container className={ classes.container } { ...props } spacing={ 1 }>
        <Grid item xs={ 1 }>
          <FilterListIcon fontSize="small" />
        </Grid>
        <Grid item xs={ 11 }>
          { children }
          <Button size="small" onClick={ handleClick }>
            { isArray(selected) ? selected.join(', ') : selected }
            <ArrowDropDownIcon fontSize="small" />
          </Button>
        </Grid>
      </Grid>
      <Popper
        open={ open }
        anchorEl={ anchorEl }
        placement={ "bottom-end" }
        className={ classes.popper }
      >
        <ClickAwayListener onClickAway={ () => setOpen(false) }>
          <Paper elevation={ 10 } square className={ classes.paper }>
            <DropDownPopperContent initialValues={ selected } onApplyFilter={ onApplyFilter } { ...props } />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </React.Fragment >
  )
}

export default FilteringDropDownMenu;
