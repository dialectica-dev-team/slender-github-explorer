import { makeStyles, Paper, Popper, Grid, Button, ClickAwayListener, createStyles } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React from 'react';
import { useSelector } from 'react-redux';
import { usePopperActions } from '../actions';
import { CombinedState } from '../typings';
import DropDownPopperContent from './DropDownPopperContent';
import { isArray } from 'util';

const useStyles = makeStyles(theme => createStyles({
  popper: {
    zIndex: theme.zIndex.appBar + 1
  },
  paper: {
    padding: theme.spacing(3)
  },
  container: {
    minWidth: 200,
    backgroundColor: theme.palette.grey[ 200 ],
    marginBottom: theme.spacing(1)
  },
  hitArea: {
    flexGrow: 1,
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  label: {}
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
      <Grid container className={ classes.container } { ...props } spacing={ 2 } justify="space-between" alignItems="center" >
        <Grid item>
          <FilterListIcon fontSize="small" />
        </Grid>
        <Grid item className={ classes.hitArea }>
          { children }
          <Button size="small" onClick={ handleClick } disableRipple>
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
